from django.db import models
from user.models import User
# Create your models here.
class Group(models.Model):
    reg_date = models.DateTimeField(auto_now_add=True)
    group_name= models.CharField(max_length=32)
    group_members = models.ManyToManyField(
        User,
        related_name='user_groups'
    ) 
    