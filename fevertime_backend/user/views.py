from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest,JsonResponse
from .models import User
import json
from json import JSONDecodeError
from .models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
# Create your views here.

def signup(request):    #copy&paste HW3
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
            nickname = req_data['nickname']
        except(KeyError, JSONDecodeError):
            return HttpResponseBadRequest()         #400
        User.objects.create_user(username=username, password=password, nickname= nickname)
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])     #405

@csrf_exempt
def signin(request):
    if request.method =='POST':
        try:
            body= request.body.decode()
            username = json.loads(body)['username']
            password = json.loads(body)['password']
        except(KeyError, JSONDecodeError):
            return HttpResponseBadRequest()         #400
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request,user)
            res_dict={'id':user.id, 'username':user.username, 'nickname':user.nickname}
            return JsonResponse(res_dict,status=200)
        else:
            return HttpResponse(status=401)
    else: 
        return HttpResponseNotAllowed(['POST'])     #405