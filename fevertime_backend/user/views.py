import json
from json import JSONDecodeError
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest,JsonResponse
from django.contrib.auth import authenticate, login, logout
from .models import User
# Create your views here.

def signup(request):   
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            nickname = req_data['nickname']
            password = req_data['password']

#            if(len(nickname)>64):
#                return HttpResponseBadRequest()
#           lets check this in frontend
        except (KeyError, json.JSONDecodeError):
            return HttpResponseBadRequest()
        if User.objects.filter(username=username).exists():
            return HttpResponse(status=401)
        User.objects.create_user(username = username, password = password, nickname=nickname)
        return HttpResponse(status=201)

    else:
        HttpResponseNotAllowed(['POST'])

def signin(request):
    if request.method =='POST':
        try:
            body= request.body.decode()
            username = json.loads(body)['username']
            password = json.loads(body)['password']
        except(KeyError, JSONDecodeError):
            return HttpResponseBadRequest()         #400
        signin_user = authenticate(request, username=username, password=password)
        if signin_user is not None:
            login(request,signin_user)
            res_dict={'id':signin_user.id, 
                      'username':signin_user.username,
                      'nickname':signin_user.nickname}
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
            return HttpResponse(status=204)
        res_dict={'id':request.user.id, 
                  'username':request.user.username,
                  'nickname':request.user.nickname}
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
        return HttpResponseNotAllowed(['GET','PUT','DELETE'])     #405
