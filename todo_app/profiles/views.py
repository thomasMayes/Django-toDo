from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, permissions, status
from .serializers import ProfileSerializer
from .models import Profile
from rest_framework.views import APIView
from rest_framework.response import Response
import json


class UserProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer

    def get(self, request, **kwargs):
        user_id = self.kwargs['id']
        userprofile = Profile.objects.filter(user=user_id)[0]

        return Response(ProfileSerializer(userprofile).data, status=status.HTTP_200_OK)


# Create your views here.
