import json
import base64
import calendar
from datetime import datetime, timedelta
from django.http import HttpResponse, JsonResponse
from django.utils import timezone
import requests

from user.models import User
from .models import Fever_history, Fever_progress
from django.core.cache import cache

daysinweek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

def chop_microsec(time):
    micro = timedelta(microseconds=time.microseconds)

    if micro.microseconds == timedelta().microseconds:
        return time
    else:
        return time +timedelta(seconds=1) - micro

def categFunc(selectCateg,histCateg):
    if selectCateg == 0:
        return True
    elif selectCateg == 1:
        return histCateg=='Study'
    elif selectCateg == 2:
        return histCateg=='Work'
    elif selectCateg == 3:
        return histCateg=='Read'
    else:
        return histCateg=='Etc.'

# 일단은 csrf_exempt 로 모두 임시로 사용

# @csrf_exempt


def fever_data_D(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode())
            user_id = data['user_id']
            selectDay = datetime.strptime(data['selectDate'].split('(')[0].replace('\n', ' ')[:-1],\
                 "%a %b %d %Y %H:%M:%S %Z%z")

            fever_data = {'t_t_time': timedelta(), 't_f_time': timedelta(),
                          'categ_time': [timedelta(), timedelta(), timedelta(), timedelta()]}
            fever_data['selectedDWM'] = selectDay.strftime("%Y/%m/%d") +\
                ' ('+selectDay.strftime('%a')+')'
            fever_data['log']=[]
            hists = cache.get_or_set('fever_hist_%d'%user_id, Fever_history.objects.filter(user_id=user_id))
            for hist in hists:
                currentday = datetime.combine(selectDay, datetime.min.time())
                nextday = datetime.combine(selectDay+timedelta(days=1), datetime.min.time())
                if (hist.end_time < nextday and hist.end_time > currentday):
                    if hist.category == 'Study':
                        fever_data['categ_time'][0] = fever_data['categ_time'][0] + hist.total_time
                    elif hist.category == 'Work':
                        fever_data['categ_time'][1] = fever_data['categ_time'][1] + hist.total_time
                    elif hist.category == 'Read':
                        fever_data['categ_time'][2] = fever_data['categ_time'][2] + hist.total_time
                    else:  # Etc.
                        fever_data['categ_time'][3] = fever_data['categ_time'][3] + hist.total_time
                fever_data['t_t_time'] = fever_data['t_t_time'] + hist.total_time
                fever_data['t_f_time'] = fever_data['t_f_time'] + hist.fever_time
                if hist.click_end=='Y':
                    fever_data['log'].append({'category':hist.category, 'tag':hist.etcCategory,\
                    'start_time':hist.start_time.strftime("%Y-%m-%d %H:%M"),'t_time':\
                    str(chop_microsec(hist.total_time)),'f_time':str(chop_microsec(\
                        hist.fever_time)),'f_rate':int(hist.fever_rate*100),\
                            'goalTime':hist.goalTime})

            fever_data['t_t_time'] = str(chop_microsec(fever_data['t_t_time']))
            fever_data['t_f_time'] = str(chop_microsec(fever_data['t_f_time']))
            for i in range(0, 4):
                fever_data['categ_time'][i] = fever_data['categ_time'][i].total_seconds()
            return JsonResponse(fever_data, safe=False, status=200)
        except Fever_history.DoesNotExist:
            return HttpResponse(status=404)

# @csrf_exempt


def fever_data_W(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode())
            user_id = data['user_id']
            selectDate = datetime.strptime(data['selectDate'].split('(')[0].replace('\n', ' ')[:-1],\
                 "%a %b %d %Y %H:%M:%S %Z%z")
            selectCateg = data['selectCateg']

            fever_data = {}
            nowDay = selectDate.weekday()
            weekstart = selectDate+timedelta(days=-nowDay)
            weekend = selectDate+timedelta(days=6-nowDay)
            fever_data['selectedDWM'] = weekstart.strftime("%Y/%m/%d")+"~"+\
                weekend.strftime("%Y/%m/%d")
            fever_data['t_t_time'] = timedelta()
            fever_data['t_f_time'] = timedelta()
            fever_data['categ_time'] = [timedelta(),timedelta(),timedelta(),timedelta()]
            fever_data['mon_sun'] = []
            for i in range(0, 7):
                fever_data['mon_sun'].append(
                    {'t_time': timedelta(), 'f_time': timedelta(), 'days': ""})

            hists = cache.get_or_set('fever_hist_%d'%user_id, Fever_history.objects.filter(user_id=user_id))
            for hist in hists:
                for i in range(0, 7):
                    nextday = datetime.combine(weekstart+timedelta(days=i+1), datetime.min.time())
                    currentday = datetime.combine(weekstart+timedelta(days=i), datetime.min.time())
                    if hist.end_time < nextday and hist.end_time > currentday:
                        if categFunc(selectCateg,hist.category) : 
                            fever_data['mon_sun'][i]['t_time'] = fever_data['mon_sun'][\
                            i]['t_time'] + hist.total_time
                            fever_data['mon_sun'][i]['f_time'] = fever_data['mon_sun'][\
                            i]['f_time'] + hist.fever_time
                            fever_data['t_t_time'] = fever_data['t_t_time'] + hist.total_time
                            fever_data['t_f_time'] = fever_data['t_f_time'] + hist.fever_time
                        if hist.category == 'Study':
                            fever_data['categ_time'][0] = fever_data['categ_time'][0]+ \
                                hist.total_time
                        elif hist.category == 'Work':
                            fever_data['categ_time'][1] = fever_data['categ_time'][1]+ \
                                hist.total_time
                        elif hist.category == 'Read':
                            fever_data['categ_time'][2] = fever_data['categ_time'][2]+ \
                                hist.total_time
                        else:  # Etc.
                            fever_data['categ_time'][3] = fever_data['categ_time'][3]+ \
                                hist.total_time

            for i in range(0, 7):
                fever_data['mon_sun'][i]['t_time'] = \
                    fever_data['mon_sun'][i]['t_time'].total_seconds()
                fever_data['mon_sun'][i]['f_time'] =\
                    fever_data['mon_sun'][i]['f_time'].total_seconds()
                fever_data['mon_sun'][i]['days'] = (weekstart+timedelta(days=i)).strftime("%m/%d")
            fever_data['avg_t_time'] = str(chop_microsec(fever_data['t_t_time']/7))
            fever_data['avg_f_time'] = str(chop_microsec(fever_data['t_f_time']/7))
            fever_data['t_t_time'] = str(chop_microsec(fever_data['t_t_time']))
            fever_data['t_f_time'] = str(chop_microsec(fever_data['t_f_time']))
            for i in range(0, 4):
                fever_data['categ_time'][i] = fever_data['categ_time'][i].total_seconds()
                
            fever_data['dataPointsF'] = list(map(lambda x:{ 'label': x[1]['days'] + "(" +\
                 daysinweek[x[0]] + ")", 'y': x[1]['f_time'] / 3600 },\
                     enumerate(fever_data['mon_sun'])))
            fever_data['dataPointsN'] = list(map(lambda x:{ 'label': x[1]['days'] + "(" +\
                daysinweek[x[0]] +")",'y':(x[1]['t_time']-x[1]['f_time'])/3600},\
                    enumerate(fever_data['mon_sun'])))
            return JsonResponse(fever_data, safe=False, status=200)
        except Fever_history.DoesNotExist:
            return HttpResponse(status=404)

# @csrf_exempt



def fever_data_M(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode())
            user_id = data['user_id']
            selectDate = datetime.strptime(data['selectDate'].split('(')[0].replace('\n', ' ')[:-1],\
                 "%a %b %d %Y %H:%M:%S %Z%z")
            selectCateg = data['selectCateg']

            fever_data = {}
            fever_data['selectedDWM'] = str(selectDate.year)+"/"+str(selectDate.month)
            fever_data['t_t_time'] = timedelta()
            fever_data['t_f_time'] = timedelta()
            fever_data['categ_time'] = [timedelta(), timedelta(), timedelta(), timedelta()]
            fever_data['dates']=[]
            LastDayofMonth = calendar.monthrange(selectDate.year, selectDate.month)[1]
            for i in range(0, LastDayofMonth):
                fever_data['dates'].append({'t_time': timedelta(), 'f_time': timedelta()})
            
            hists = cache.get_or_set('fever_hist_%d'%user_id, Fever_history.objects.filter(user_id=user_id))
            for hist in hists:
                for i in range(0, LastDayofMonth):
                    nextday = datetime(selectDate.year, selectDate.month, i+1)+timedelta(days=1)
                    currentday = datetime(selectDate.year, selectDate.month, i+1)
                    if hist.end_time < nextday and hist.end_time > currentday:
                        if categFunc(selectCateg,hist.category):
                            fever_data['dates'][i]['t_time'] = fever_data['dates'][i]['t_time']+\
                                hist.total_time
                            fever_data['dates'][i]['f_time'] = fever_data['dates'][i]['f_time']+\
                                hist.fever_time
                            fever_data['t_t_time'] = fever_data['t_t_time'] + hist.total_time
                            fever_data['t_f_time'] = fever_data['t_f_time'] + hist.fever_time
                        if hist.category == 'Study':
                            fever_data['categ_time'][0] = fever_data['categ_time'][0] +\
                                hist.total_time
                        elif hist.category == 'Work':
                            fever_data['categ_time'][1] = fever_data['categ_time'][1] +\
                                hist.total_time
                        elif hist.category == 'Read':
                            fever_data['categ_time'][2] = fever_data['categ_time'][2] +\
                                hist.total_time
                        else:  # Etc.
                            fever_data['categ_time'][3] = fever_data['categ_time'][3] +\
                                hist.total_time

            for i in range(0, LastDayofMonth):
                fever_data['dates'][i]['t_time'] = fever_data['dates'][i]['t_time'].total_seconds()
                fever_data['dates'][i]['f_time'] = fever_data['dates'][i]['f_time'].total_seconds()
            fever_data['avg_t_time'] = str(chop_microsec(fever_data['t_t_time']/LastDayofMonth))
            fever_data['avg_f_time'] = str(chop_microsec(fever_data['t_f_time']/LastDayofMonth))
            fever_data['t_t_time'] = str(chop_microsec(fever_data['t_t_time']))
            fever_data['t_f_time'] = str(chop_microsec(fever_data['t_f_time']))
            for i in range(0, 4):
                fever_data['categ_time'][i] = fever_data['categ_time'][i].total_seconds()
            fever_data['dataPointsF'] = list(map(lambda x:{ 'label': str(x[0]+1),\
                'y': x[1]['f_time'] / 3600 },enumerate(fever_data['dates'])))
            fever_data['dataPointsN'] = list(map(lambda x:{ 'label': str(x[0]+1),\
                'y':(x[1]['t_time']-x[1]['f_time'])/3600}, enumerate(fever_data['dates'])))
            return JsonResponse(fever_data, safe=False, status=200)
        except Fever_history.DoesNotExist:
            return HttpResponse(status=404)

# @csrf_exempt


def fever_history(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())

        newfever = Fever_history(category=req_data['category'],
                                 user=request.user,
                                 goalTime=req_data['goalTime'],
                                 etcCategory=req_data['etcCategory'])
        newfever.save()
        return JsonResponse({
            'id': newfever.id,
            'category': newfever.category
        }, status=201)
    elif request.method == 'PUT':
        req_data = json.loads(request.body.decode())
        fever = Fever_history.objects.filter(id=req_data['id'])

        try:
            fever = fever[0]
        except IndexError:
            return HttpResponse(status=404)

        fever_prog_list = Fever_progress.objects.filter(fever_history=fever)
        fever_cnt = 0
        for prog in fever_prog_list:
            if prog.fever_yn == 'Y':
                fever_cnt += 1
        if len(fever_prog_list) == 0:
            fever.fever_rate = 0
        else:
            fever.fever_rate = fever_cnt / len(fever_prog_list)
        fever.fever_count = fever_cnt
        # 모든 fever_progress 찾아서 time 계산 로직 추가
        fever.click_end = 'Y'
        fever.total_time = timezone.now() - fever.start_time
        total_time = fever.total_time
        fever.fever_time = total_time * fever.fever_rate
        fever_time = fever.fever_time
        resstr = []
        for time in [total_time, fever_time]:
            # total time 을 hh:mm:ss 형태로 바꾸기
            days, seconds = time.days, time.seconds
            hours = days * 24 + seconds // 3600
            minutes = (seconds % 3600) // 60
            seconds = (seconds % 60)
            if hours // 10 == 0:
                hours = '0' + str(hours)
            if minutes // 10 == 0:
                minutes = '0' + str(minutes)
            if seconds // 10 == 0:
                seconds = '0' + str(seconds)
            resstr.append('{}:{}:{}'.format(hours, minutes, seconds))

        fever.save()
        res = {
            'id': fever.id,
            'start_time': fever.start_time,
            'end_time': fever.end_time,
            'total_time': resstr[0],
            'fever_time': resstr[1],
            'fever_rate': fever.fever_rate,
        }
        return JsonResponse(res, status=200)
    else:
        return HttpResponse(status=405)


# @csrf_exempt
def fever_progress(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        image = req_data['image']
        fever = Fever_history.objects.filter(id=req_data['id'])
        try:
            fever = fever[0]
        except IndexError:
            return HttpResponse(status=404)
        # 앞에 data:image/jpeg;base64, 부분 잘라내기
        image = image.split(',')[1]
        # base64 포맷을 binary 로 변환하기
        image = base64.b64decode(image)

        ##########################
        # file = {'file': image} #, 'image_url': 20
        # myKey = "3ac17bc0e257b604d053901085eaae99"
        # kakao api 관련 세팅
        kakao_url = "https://kapi.kakao.com/v1/vision/face/detect"
        kakao_headers = {'Authorization': 'KakaoAK {}'.format(
            "3ac17bc0e257b604d053901085eaae99")}

        # msazur api 관련 세팅
        # msazure_url 은 endpoint + api_url 로 이루어짐
        MSazure_url = "https://koreacentral.api.cognitive.microsoft.com/vision/v2.1/analyze"
        MSazure_headers = {'Ocp-Apim-Subscription-Key': "ab6fb46e804f4be48422cdaafb65f4f1",
                           'Content-Type': 'application/octet-stream'}
        MSazure_params = {'visualFeatures': 'Faces,Description,Objects'}
        try:
            response = requests.post(
                kakao_url, headers=kakao_headers, files={'file': image})
            response.raise_for_status()
            response = response.json()['result']

            # face detect 안됬을때 default 속성
            face_list = [0, 0, 0, 0]
            pitch = 0
            yaw = 0
            roll = 0
            faceDetect = False
            try:
                face = response['faces'][0]
                # face detect 시 res 값으로 update
                face_list[0] = face['x']
                face_list[1] = face['y']
                face_list[2] = face['w']
                face_list[3] = face['h']
                pitch = face['pitch']
                yaw = face['yaw']
                roll = face['roll']

                faceDetect = True
                if face['score'] < 0.8:
                    faceDetect = False

            except KeyError:
                pass

            response = requests.post(
                MSazure_url, headers=MSazure_headers, params=MSazure_params, data=image)
            response.raise_for_status()
            MSazure_response = response.json()

            MSazure_url = "https://koreacentral.api.cognitive.microsoft.com/face/v1.0/detect"
            MSazure_headers = {'Ocp-Apim-Subscription-Key': "ab6fb46e804f4be48422cdaafb65f4f1",
                               'Content-Type': 'application/octet-stream'}
            MSazure_params = {
                'returnFaceId': 'true',
                'returnFaceLandmarks': 'false',
                'returnFaceAttributes': 'age,gender,smile,emotion,occlusion,blur,exposure,noise',
            }
            response = requests.post(
                MSazure_url, headers=MSazure_headers, params=MSazure_params, data=image)
            response.raise_for_status()
            MSazure_face_response = response.json()

            fever_yn = 'N'
            phone_detect = False
            smile_detect = False
            ##########
            # 1. 얼굴 인식이 되었으면, fever 했음으로 취급한다.
            if faceDetect:
                fever_yn = 'Y'
            # 2. description option 에서 핸드폰이 detect 되었으면, fever 안했음으로 취급한다.
            if 'cellphone' in MSazure_response["description"]["tags"]:
                fever_yn = 'N'
                phone_detect = True
            # 3. objects option 에서 핸드폰이 detect 되었으면, fever 안했음으로 취급한다.
            for image_object in MSazure_response["objects"]:
                if image_object['object'] == 'cell phone':
                    fever_yn = 'N'
                    phone_detect = True
                    break
            # print(MSazure_face_response[0]["faceAttributes"]["emotion"])
            try:
                if MSazure_face_response[0]["faceAttributes"]["emotion"]["happiness"] >=0.2 or MSazure_face_response[0]["faceAttributes"]["emotion"]["neutral"] <=0.8:
                    fever_yn = 'N'
                    smile_detect = True
            except (KeyError, IndexError):
                pass
            ###########
            newfever_prog = Fever_progress(fever_yn=fever_yn,
                                           user=request.user,
                                           fever_history=fever,
                                           facex=face_list[0],
                                           facey=face_list[1],
                                           facew=face_list[2],
                                           faceh=face_list[3],
                                           pitch=pitch,
                                           yaw=yaw,
                                           roll=roll)
            newfever_prog.save()
            return JsonResponse({'face_detect': faceDetect,
                                 'phone_detect': phone_detect,
                                 'smile_detect': smile_detect}, status=200)
        except requests.exceptions.HTTPError:
            return HttpResponse(status=400)

    elif request.method == 'GET':
        #10 분에 한번씩 fever rate 가져오기
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=405)

# @csrf_exempt


def fever_exception(request):
    if request.user.is_authenticated:
        if request.method == 'GET':
            fevers = Fever_history.objects.filter(
                user=request.user).filter(click_end='N')
            if len(fevers) == 0:
                return HttpResponse(status=201)

            last_hid = fevers[len(fevers)-1].id
            res_dict = {'last_hid': last_hid,
                        'num_fevers': len(fevers)}
            return JsonResponse(res_dict, status=200)
        elif request.method == 'PUT':
            req_data = json.loads(request.body.decode())
            clickmode = req_data['clickmode']
            fevers = Fever_history.objects.filter(
                user=request.user).filter(click_end='N')
            res_id = 0
            res_goalTime = ''
            res_prog_time = 0
            time_standard = 60
            for i, fever in enumerate(fevers):
                # 1분에 한번씩 capture 한다면,
                # 가장 최근의 fever 일때
                if clickmode == 'confirm' and i == len(fevers) - 1:
                    res_id = fever.id
                    res_goalTime = fever.goalTime
                    fever_prog_list = Fever_progress.objects.filter(
                        fever_history=fever)
                    # 가장 최근의 fever 의 start_time 값을 현재에서, fever_progress 가 불렸던 횟수 를 고려해
                    # 지금 이전의 시간으로 업데이트 한다.
                    fever.start_time = timezone.now() - timedelta(
                        seconds=len(fever_prog_list) * time_standard)
                    res_prog_time = len(fever_prog_list)
                    fever.save()
                    break
                # 가장 마지막 fever 를 제외하곤, 모두 Y 로 값을 만들어 버린다.
                fever.click_end = 'Y'
                fever_prog_list = Fever_progress.objects.filter(
                    fever_history=fever)
                fever_cnt = 0
                for prog in fever_prog_list:
                    if prog.fever_yn == 'Y':
                        fever_cnt += 1
                if len(fever_prog_list) == 0:
                    fever.fever_rate = 0
                else:
                    fever.fever_rate = fever_cnt / len(fever_prog_list)

                # 이때 모든 시간은 fever_progress 를 기준으로 한다.
                fever.fever_count = fever_cnt
                fever.total_time = timedelta(
                    seconds=len(fever_prog_list) * time_standard)
                fever.fever_time = timedelta(seconds=fever_cnt * time_standard)
                fever.save()
            if clickmode == 'confirm':
                return JsonResponse({'hid': res_id,
                                     'goalTime': res_goalTime,
                                     'prog_time': res_prog_time}, status=200)
            return HttpResponse(status=201)
        # else:
        #     return HttpResponse(status=405)
    else:   # login 안한 유저일때 예외처리
        return HttpResponse(status=204)

def fever_top_list(request):
    if request.method == 'GET':
        user_list = User.objects.exclude(nickname='')
        response_list = [user_weekly_feverExtraction(user, 0) for user in user_list]
        response_list.sort(key=lambda timeinfo: timeinfo["fever_time"], reverse=True)
        res_dict = [response_list[0], response_list[1],response_list[2]]
        for index, dictionary in enumerate(res_dict):
            dictionary['rank'] = index+1
        return JsonResponse(res_dict, status=200, safe=False)

def user_weekly_feverExtraction(user, backstep):
    Current_ISO_tuple = (datetime.now()-timedelta(weeks=backstep)).isocalendar()
    total_fever_time = timedelta(microseconds=0)
    for session in user.fever_history_user.all():
        if session.click_end == "Y":
            session_ISO_tuple = session.end_time.isocalendar()
            if((session_ISO_tuple[0] == Current_ISO_tuple[0]) and
               (session_ISO_tuple[1] == Current_ISO_tuple[1])):
                total_fever_time += session.fever_time
    tsec = total_fever_time.total_seconds()
    hour = int(tsec//(60*60))
    minute = int((tsec%3600)//60)
    sec = int((tsec%60))
    return_dict = {
        "rank" : 0,
        "firstword" : user.nickname[0],
        "name" : user.nickname,
        "fever_time" : "{:02d}:{:02d}:{:02d}".format(hour, minute, sec)
    }
    return return_dict
