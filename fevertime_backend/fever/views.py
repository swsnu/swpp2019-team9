from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from .models import Fever_history, Fever_progress
import json


# 일단은 csrf_exempt 로 모두 임시로 사용
@csrf_exempt
def fever_history(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        category = req_data['category']

        user = get_user_model().objects.get(id=1)

        # user = request.user
        newfever = Fever_history(category=category, user=user)
        newfever.save()
        res = {
            'id': newfever.id,
            'title': newfever.category
        }
        return JsonResponse(res,status=200)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def fever_progress(request):
    if request.method == 'GET':
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def fever_exception(request):
    if request.method == 'GET':
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=405)