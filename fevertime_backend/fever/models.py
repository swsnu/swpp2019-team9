from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Fever_history(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='fever_history_user'
    )
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(auto_now=True)
    category = models.CharField(max_length=45)
    total_time = models.DateField()
    fever_time = models.DateField()
    fever_rate = models.DateField()
    fever_count = models.IntegerField(default=0)
    click_end = models.CharField(max_length=1, default='N')


class Fever_progress(models.Model):
    reg_date = models.DateTimeField(auto_now_add=True)
    fever_yn = models.CharField(max_length=1, default='N')
    fever_history = models.ForeignKey(
        Fever_history,
        on_delete=models.CASCADE,
        related_name='hid'
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='fever_progress_user'
    )
