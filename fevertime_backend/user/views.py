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
            wrong = req_data['wrong']
        except (KeyError, json.JSONDecodeError):
            return HttpResponseBadRequest()
        return_dict = {"ID" : "", "nickname" : ""}
        if username == "":
            wrong = True
            return_dict["ID"] = "Empty ID" #empty nickname
        else:
            if User.objects.filter(username=username).exists(): #401 ID exist
                wrong = True
                return_dict["ID"] = "ID exists"
        if nickname == "":
            wrong = True
            return_dict["nickname"] = "Empty Nickname" #empty nickname
        else:
            if len(nickname) >= 64:
                wrong = True
                return_dict["nickname"] = "Too long nickname"
            elif User.objects.filter(nickname=nickname).exists(): #401 Nickname exist
                wrong = True
                return_dict["nickname"] = "nickname exists"
        if not wrong: #all OKay then create user
            User.objects.create_user(username=username, password=password, nickname=nickname)
            return JsonResponse(return_dict, status=201) #lets gogo
        return JsonResponse(return_dict, status=401) #lets gogo

    else:
        return HttpResponseNotAllowed(['POST'])

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
                      'nickname':signin_user.nickname,
                      'showdata':signin_user.showdata}
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
                  'nickname':request.user.nickname,
                  'showdata':request.user.showdata,
                 }
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
        #Changing_User = User.objects.get(id=request.user.id)
        if User.objects.filter(nickname=user_nickname).exists():
            return HttpResponse(status=402) #what response?
        request.user.set_password(user_password)
        request.user.nickname=user_nickname
        request.user.save()
        response_dict={
            'id': request.user.id,
            'username': request.user.username,
            'nickname': request.user.nickname,
            'showdata': request.user.showdata,
        }
        return JsonResponse(response_dict, status=200)
    else:
        return HttpResponseNotAllowed(['GET','PUT'])     #405


def social(request):
    if request.method =='PUT':
        user_showdata=request.user.showdata
        user_showdata = not user_showdata
        request.user.showdata=user_showdata
        request.user.save()
        return HttpResponse(status=200)
    else: 
        return HttpResponseNotAllowed(['PUT'])     #405
