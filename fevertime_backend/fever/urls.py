from django.urls import path
from fever import views

urlpatterns = [
    path('_history/', views.fever_history, name='fever_history'),
    path('_progress/', views.fever_progress, name='fever_progress'),
    path('_exception/', views.fever_exception, name='fever_exception'),
]
