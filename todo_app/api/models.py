from django.db import models
from django.contrib.auth.models import User

# Create your models here.


# class User(models.Model):
#     fullname = models.CharField(max_length=20)
#     user_code = models.CharField(max_length=3)


class Todo(models.Model):
    title = models.CharField(max_length=20)
    description = models.CharField(max_length=300)
    completed = models.BooleanField(default=False)
    owner = models.CharField(max_length=20, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
