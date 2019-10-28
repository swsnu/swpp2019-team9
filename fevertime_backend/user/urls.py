from django.urls import path
from . import views

urlpatterns = [
    path('signup/<str:input_ID>/', views.signup, name='signup'),
    path('signin/', views.signin, name ='signin'),
    path('signout/', views.signout,name='signout'),
    path('', views.user, name='default'),
]
