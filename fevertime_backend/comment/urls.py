from django.urls import path
from . import views

urlpatterns = [
    path('delete/<int:comment_id>/', views.delete_comment, name='comment'),
    path('<int:group_id>/', views.comment, name='comment'),
]
