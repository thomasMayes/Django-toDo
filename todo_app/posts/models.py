from django.db import models
from django.contrib.auth.models import User


class Topic(models.Model):
    title = models.CharField(max_length=30)
    color = models.CharField(max_length=10)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title


class Post(models.Model):
    title = models.CharField(max_length=20)
    description = models.CharField(max_length=300)
    owner = models.ForeignKey(
        User, related_name="posts", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    topics = models.ManyToManyField(Topic)
