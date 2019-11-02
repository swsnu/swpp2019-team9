from django.db import models

# Create your models here.
class Group(models.Model):
    reg_date = models.DateTimeField(auto_now_add=True)
    group_name= models.CharField(max_length=32)
