from django.urls import path
from . import views

urlpatterns = [
    path('request/', views.friend_request, name='request'),
    #path('real/', views.friend_real, name='real')
]
