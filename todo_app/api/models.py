from django.db import models

# Create your models here.


class User(models.Model):
    fullname = models.CharField(max_length=100)
    user_code = models.CharField(max_length=3)
