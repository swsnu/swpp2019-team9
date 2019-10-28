from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest,JsonResponse
from .models import User
import json
from json import JSONDecodeError
from .models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
# Create your views here.

def signup(request, input_ID=""):    
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = input_ID
            nickname = req_data['Nickname']
            password = req_data['Password']

            if(len(nickname)>64):
                return HttpResponseBadRequest() 

        except (KeyError, json.JSONDecodeError) as e:
            return HttpResponseBadRequest()    
        User.objects.create_user(username = username, password = password,nickname=nickname)

        return HttpResponse(status=201)

    elif request.method == 'GET':
        if(User.objects.filter(username=input_ID).count()==0):
            return HttpResponse(True, status=200)
        else:
            return HttpResponse(False, status=200)
        
    else:
        HttpResponseNotAllowed(['GET','POST'])

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
        
def signout(request):
    if request.method =='GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        else:            
            return HttpResponse(status=401)
    else: 
        return HttpResponseNotAllowed(['GET'])      #405

def user(request):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        res_dict={'id':request.user.id, 'username':request.user.username, 'nickname':request.user.nickname}
        return JsonResponse(res_dict,status=200)
    elif request.method =='PUT':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            body=request.body.decode()
            user_nickname=json.loads(body)['nickname']
            user_password=json.loads(body)['password']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()        #400
        request.user.set_password(user_password)
        request.user.nickname=user_nickname
        response_dict={
            'id': request.user.id,
            'username': request.user.username,
            'nickname': request.user.nickname,
        }
        return JsonResponse(response_dict, status=200)
    elif request.method =='DELETE':
        return HttpResponse()
        #delete user
    else:
        return HttpResponseNotAllowed(['GET,PUT,DELETE'])     #405
