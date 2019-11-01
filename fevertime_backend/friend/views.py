import json
from json import JSONDecodeError
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse, HttpResponseNotFound, HttpResponseForbidden
from .models import Friend_real, Friend_request
from user.models import User
# Create your views here.

def friend_request(request):
    if request.method =='GET':
        friend_requests= request.user.request_getter.all()
        response_dict=[{'nickname':friend.from_user.nickname} for friend in friend_requests]
        return JsonResponse(response_dict, safe=False)
            
    elif request.method =='POST':
        try:
            body=request.body.decode()
            to_nickname=json.loads(body)['nickname']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()        #400
        try:
            to_user=User.objects.get(nickname=to_nickname)
        except User.DoesNotExist:
            return HttpResponseNotFound()       #404
        from_user=request.user
        if Friend_request.objects.filter(to_user=to_user).filter(from_user=from_user).exists():
            return HttpResponseForbidden()      #403
        if to_user == from_user:
            return HttpResponseForbidden()      #403
        friend_request=Friend_request(from_user=from_user, to_user=to_user)
        friend_request.save()
        return HttpResponse(status=201)
    else: 
        return HttpResponseNotAllowed(['GET','POST'])

def request_specific(request,to_nickname):
    if request.method =='DELETE':
        try:
            from_user=User.objects.get(nickname=to_nickname)
        except User.DoesNotExist:
            return HttpResponseNotFound()       #404
        to_user=request.user
        try:
            delete_request=Friend_request.objects.filter(to_user=to_user).get(from_user=from_user)
        except Friend_request.DoesNotExist:
            return HttpResponseNotFound()       #404
        delete_request.delete()
        return HttpResponse(status=200)

    else: 
        return HttpResponseNotAllowed(['DELETE'])     

def friend_real(request):
    if request.method =='GET':
        friend_real= request.user.user_friend1.all()
        response_dict=[{'nickname':friend.friend2.nickname} for friend in friend_real]
        return JsonResponse(response_dict, safe=False)
            
    elif request.method =='POST':
        try:
            body=request.body.decode()
            nickname=json.loads(body)['nickname']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()        #400
        try:
            user1=User.objects.get(nickname=nickname)
        except User.DoesNotExist:
            return HttpResponseNotFound()       #404
        user2=request.user
        if Friend_real.objects.filter(friend1=user1).filter(friend2=user2).exists():
            return HttpResponseForbidden()      #403
        friend_real1=Friend_real(friend1=user1, friend2=user2)
        friend_real2=Friend_real(friend1=user2, friend2=user1)
        friend_real1.save()
        friend_real2.save()
        try:
            delete_request1=Friend_request.objects.filter(to_user=user1).get(from_user=user2)
            delete_request1.delete()
        except Friend_request.DoesNotExist:
            pass
        try:
            delete_request2=Friend_request.objects.filter(to_user=user2).get(from_user=user1)
            delete_request2.delete()
        except Friend_request.DoesNotExist:
            pass
        return HttpResponse(status=201)
    else: 
        return HttpResponseNotAllowed(['GET','POST'])       #405


def real_specific(request,nickname):
    if request.method =='DELETE':
        try:
            user1=User.objects.get(nickname=nickname)
        except User.DoesNotExist:
            return HttpResponseNotFound()       #404
        user2=request.user
        try:
            delete_real1 = Friend_real.objects.filter(friend1=user1).get(friend2=user2)
            delete_real2 = Friend_real.objects.filter(friend1=user2).get(friend2=user1)
            delete_real1.delete()
            delete_real2.delete()
        except Friend_real.DoesNotExist:
            pass      #404
        return HttpResponse(status=200)       

    else: 
        return HttpResponseNotAllowed(['DELETE'])       #405
