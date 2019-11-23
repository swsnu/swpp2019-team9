from django.urls import path
from . import views

urlpatterns = [
    path('', views.group, name='group'),
    path('group_members/<int:group_id>/', views.group_member_op, name='group_members'),
    path('leaderboard/<int:group_id>/<int:week_delta>/<str:fever_tag>/',
         views.leaderboard, name='leaderboard'),
    path('group_add/<int:group_id>/', views.group_add, name='group_add'),
]
