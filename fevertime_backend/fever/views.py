import json
import base64
from django.http import HttpResponse, JsonResponse
from django.utils import timezone

import requests


from .models import Fever_history, Fever_progress



# 일단은 csrf_exempt 로 모두 임시로 사용
# @csrf_exempt
def fever_history(request):

    if request.method == 'POST':
        req_data = json.loads(request.body.decode())

        newfever = Fever_history(category=req_data['category'], user=request.user, etcCategory=req_data['etcCategory'])
        newfever.save()
        res = {
            'id': newfever.id,
            'category': newfever.category
        }
        return JsonResponse(res,status=201)
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
                fever_cnt +=1
        if len(fever_prog_list) == 0:
            fever.fever_rate = 0
        else:
            fever.fever_rate = fever_cnt / len(fever_prog_list)
        fever.fever_count = fever_cnt
        # 모든 fever_progress 찾아서 time 계산 로직 추가
        fever.click_end = 'Y'
        end_time = timezone.now()
        fever.total_time = end_time - fever.start_time
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
            if hours //10 == 0:
                hours = '0'+ str(hours)
            if minutes //10 == 0:
                minutes = '0'+ str(minutes)
            if seconds //10 == 0:
                seconds = '0'+ str(seconds)
            resstr.append('{}:{}:{}'.format(hours, minutes,seconds))

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

        url = "https://kapi.kakao.com/v1/vision/face/detect"
        myKey = "3ac17bc0e257b604d053901085eaae99"
        headers = {'Authorization': 'KakaoAK {}'.format(myKey)}
        try:
            response = requests.post(url, headers=headers, files={'file': image})
            print(response.text)
            response.raise_for_status()
            response = response.json()['result']

            # face detect 안됬을때 default 속성
            facex = 0
            facey = 0
            facew = 0
            faceh = 0
            score = 0
            pitch = 0
            yaw = 0
            roll = 0
            faceDetect = False

            try:
                face = response['faces'][0]
                #face detect 시 res 값으로 update
                facex = face['x']
                facey = face['y']
                facew = face['w']
                faceh = face['h']
                score = face['score']
                pitch = face['pitch']
                yaw = face['yaw']
                roll = face['roll']

                faceDetect = True
                if score < 0.8:
                    faceDetect = False

            except Exception as e:
                pass
            ##########
            # 1. 얼굴 인식이 되었으면, fever 했음으로 취급한다.
            fever_yn = 'N'
            if faceDetect == True:
                fever_yn = 'Y'

            ###########
            newfever_prog = Fever_progress(fever_yn=fever_yn,
                                           user=request.user,
                                           fever_history=fever,
                                           facex=facex,
                                           facey=facey,
                                           facew=facew,
                                           faceh=faceh,
                                           pitch=pitch,
                                           yaw=yaw,
                                           roll=roll)
            newfever_prog.save()
            return JsonResponse({'faceDetect' : faceDetect}, status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=400)

    elif request.method == 'GET':
        #10 분에 한번씩 fever rate 가져오기
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=405)

# @csrf_exempt
def fever_exception(request):
    if request.method == 'GET':
        fevers = Fever_history.objects.filter(user=request.user)
        if len(fevers) == 0:
            return HttpResponse(status=200)
        else:
            id_list = []
            for fever in fevers:
                if fever.click_end == 'N':
                    id_list.append(fever.id)
            return JsonResponse({'id_list': id_list}, status=201)
    else:
        return HttpResponse(status=405)
