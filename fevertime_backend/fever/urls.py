from django.urls import path
from fever import views

urlpatterns = [
    path('_data_W/', views.fever_data_W, name='fever_data_W'),
    path('_data_M/', views.fever_data_M, name='fever_data_M'),
    path('_history/', views.fever_history, name='fever_history'),
    path('_progress/', views.fever_progress, name='fever_progress'),
    path('_exception/', views.fever_exception, name='fever_exception'),
]
