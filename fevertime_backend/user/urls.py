from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name ='signin'),
    path('signout/', views.signout,name='signout'),
    path('social/', views.social,name='social'),
    path('social/<int:user_id>/', views.social_specific, name='social_specific'),
    path('', views.user, name='default'),
]
