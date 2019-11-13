from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class User(AbstractUser):
    nickname= models.CharField(max_length=64)
    showdata = models.BooleanField(default=True)
    ToU = models.BooleanField(default=True)
    PI = models.BooleanField(default=True)
    