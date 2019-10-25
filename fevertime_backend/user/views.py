from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest
from .models import User
# Create your views here.

def signup(request):    
    return HttpResponse(stauts=200)