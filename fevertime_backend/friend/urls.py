from django.urls import path
from . import views

urlpatterns = [
    path('request/', views.friend_request, name='request'),
    path('request/<str:to_nickname>/', views.request_specific, name='request_specific'),
    path('real/', views.friend_real, name='real')
    #path('real/<str:to_nickname>', views.real_specific, name='real_specific')
]
