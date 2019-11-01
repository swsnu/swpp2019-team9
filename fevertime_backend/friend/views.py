import json
from json import JSONDecodeError
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse, HttpResponseNotFound, HttpResponseForbidden
from .models import Friend_real, Friend_request
from user.models import User
# Create your views here.

def friend_request(request):
    if request.method =='GET':
        friend_requests= request.user.request_getter.all()
        response_dict=[{'username':friend.from_user.username, 'nickname':friend.from_user.nickname} for friend in friend_requests]
        return JsonResponse(response_dict, safe=False)
            
    elif request.method =='POST':
        try:
            body=request.body.decode()
            to_nickname=json.loads(body)['nickname']            #nickname duplicate?
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()        #400
        to_user=User.objects.get(nickname=to_nickname)
        from_user=request.user
        friend_request=Friend_request(from_user=from_user, to_user=to_user)
        friend_request.save()
        return HttpResponse(status=201)
"""
    elif request.method =='DELETE':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            article = Article.objects.get(id=article_id)
        except Article.DoesNotExist:
            return HttpResponseNotFound()       #404
        if request.user.id != article.author_id:
            return HttpResponseForbidden()      #403
        article.delete()
        return HttpResponse(status=200)       

    else: 
        return HttpResponseNotAllowed(['GET','POST','DELETE'])       #405

def friend_real(request):
    if request.method =='GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            article=Article.objects.get(id=article_id)
        except Article.DoesNotExist:
            return HttpResponseNotFound()       #404
        response_dict={                                                             #id??????????????????
            'id': article.id,
            'title': article.title,
            'content': article.content,
            'author': article.author_id
        }
        return JsonResponse(response_dict, status=200)
            
    elif request.method =='POST':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            article = Article.objects.get(id=article_id)
        except Article.DoesNotExist:
            return HttpResponseNotFound()       #404
        if request.user.id != article.author_id:
            return HttpResponseForbidden()      #403
        try:
            body=request.body.decode()
            article_title=json.loads(body)['title']
            article_content=json.loads(body)['content']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()        #400
        article.title=article_title
        article.content=article_content
        article.save()
        response_dict={
            'id': article.id,
            'title': article.title,
            'content': article.content,
            'author': article.author_id
        }
        return JsonResponse(response_dict, status=200)

    elif request.method =='DELETE':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            article = Article.objects.get(id=article_id)
        except Article.DoesNotExist:
            return HttpResponseNotFound()       #404
        if request.user.id != article.author_id:
            return HttpResponseForbidden()      #403
        article.delete()
        return HttpResponse(status=200)       

    else: 
        return HttpResponseNotAllowed(['GET','POST','DELETE'])       #405
"""