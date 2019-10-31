from datetime import timedelta

from django.db import models
from django.conf import settings
# Create your models here.

class Fever_history(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='fever_history_user'
    )
    category = models.CharField(max_length=45)
    etcCategory = models.CharField(max_length=45, blank=True)

    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(auto_now=True)

    total_time = models.DurationField(default=timedelta())
    fever_time = models.DurationField(default=timedelta())

    fever_rate = models.FloatField(default=0)
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
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='fever_progress_user'
    )
    facex = models.FloatField(default=0)
    facey = models.FloatField(default=0)
    facew = models.FloatField(default=0)
    faceh = models.FloatField(default=0)
    pitch = models.FloatField(default=0)
    yaw = models.FloatField(default=0)
    roll = models.FloatField(default=0)
