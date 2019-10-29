import urllib

from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from .models import Fever_history, Fever_progress
import json
import datetime
from pytz import timezone, utc
from django.utils import timezone



# 일단은 csrf_exempt 로 모두 임시로 사용
# @csrf_exempt
def fever_history(request):
    # signin 기능 추가시 바뀌어야 함 ##
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        category = req_data['category']
        etcCategory = req_data['etcCategory']

        # user = request.user
        newfever = Fever_history(category=category, user=request.user, etcCategory=etcCategory)
        newfever.save()
        res = {
            'id': newfever.id,
            'category': newfever.category
        }
        return JsonResponse(res,status=201)
    elif request.method == 'PUT':
        req_data = json.loads(request.body.decode())
        hid = req_data['id']
        fever = Fever_history.objects.filter(id=hid)
        try:
            fever = fever[0]
        except IndexError:
            return HttpResponse(status=404)

        # 모든 fever_progress 찾아서 time 계산 로직 추가
        fever.click_end = 'Y'
        end_time = timezone.now()
        fever.total_time = end_time - fever.start_time
        #total time 을 hh:mm:ss 형태로 바꾸기
        total_time = fever.total_time
        days, seconds = total_time.days, total_time.seconds
        hours = days * 24 + seconds // 3600
        minutes = (seconds % 3600) // 60
        seconds = (seconds % 60)
        if hours //10 == 0:
            hours = '0'+ str(hours)
        if minutes //10 == 0:
            minutes = '0'+ str(minutes)
        if seconds //10 == 0:
            seconds = '0'+ str(seconds)
        resstr = '{}:{}:{}'.format(hours, minutes,seconds)


        fever.save()
        res = {
            'id': fever.id,
            'start_time': fever.start_time,
            'end_time': fever.end_time,
            'total_time': resstr,
            'fever_time': fever.fever_time,
            'fever_rate': fever.fever_rate,
        }
        return JsonResponse(res, status=200)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def fever_progress(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        image = req_data['image']

        ##########################
        data = {'file': image} #, 'image_url': 20
        data = urllib.parse.urlencode(data).encode()
        url = "https://kapi.kakao.com/v1/vision/face/detect"

        image_request = urllib.request.Request(url, data=data)
        image_request.add_header('Content-Type', "multipart/form-data")
        image_request.add_header('Authorization', "KakaoAK 3ac17bc0e257b604d053901085eaae99")

        response = urllib.request.urlopen(image_request)
        if response.getcode() == 200:
            image_response = response.read().decode('utf-8')
            image_response = json.loads(image_response)
            context = {
                'result': image_response
            }

        #######################
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def fever_exception(request):
    if request.method == 'GET':
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=405)
