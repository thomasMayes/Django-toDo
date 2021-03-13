from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, permissions, status
from .serializers import ProfileSerializer
from .models import Profile
from rest_framework.views import APIView
from rest_framework.response import Response
from posts.models import Post
from posts.serializers import PostSerializer
import json


class UserProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer

    def get(self, request, **kwargs):
        user_id = self.kwargs['id']
        userprofile = Profile.objects.filter(user=user_id)[0]
        userposts = Post.objects.filter(owner=user_id)
        serializer = PostSerializer(userposts, many=True)
        print(serializer.data)

        result = {
            'profile': ProfileSerializer(userprofile).data,
            'posts': serializer.data

        }

        return Response(result, status=status.HTTP_200_OK)


# Create your views here.
