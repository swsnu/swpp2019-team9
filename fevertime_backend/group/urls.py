from django.urls import path
from . import views

urlpatterns = [
    path('', views.group, name='group'),
    path('group_members/<int:group_id>/', views.group_member_op, name='group_members'),
    path('group_add/<int:group_id>/', views.group_add, name='group_add'),
]
