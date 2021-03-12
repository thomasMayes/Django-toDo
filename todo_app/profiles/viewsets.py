from .models import Profile
from rest_framework import viewsets
from .serializers import ProfileSerializer
from django.contrib.auth.models import User


class ProfileViewset(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
