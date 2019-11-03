from django.db import models
from user.models import User
# Create your models here.
class Friend_request(models.Model):
    from_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='request_giver'
    )
    to_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='request_getter'
    )

class Friend_real(models.Model):
    friend1 = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='user_friend1'
    )
    friend2 = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='user_friend2'
    )
    