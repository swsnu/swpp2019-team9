import json
from django.http import HttpResponse, HttpResponseNotAllowed, \
                        JsonResponse, HttpResponseNotFound, HttpResponseForbidden
from user.models import User
# Create your views here.

def group(request):
    if request.method == 'GET':
        return 1
    elif request.method == 'POST':
        return 1
    else:
        return HttpResponseNotAllowed(['GET','POST'])