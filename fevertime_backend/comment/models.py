from django.db import models
from user.models import User
from group.models import Group

# Create your models here.
class Comment(models.Model):
    author = models.ForeignKey(
        User, on_delete=models.CASCADE)
    group = models.ForeignKey(
        Group, on_delete=models.CASCADE)
    content = models.TextField()
    createdate = models.DateTimeField(auto_now_add=True)