from posts.models import Post, Topic
from rest_framework import viewsets, permissions
from .serializers import PostSerializer, TopicSerializer, UserSerializer
from django.contrib.auth.models import User
# Lead Viewset


class PostViewSet(viewsets.ModelViewSet):
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class TopicViewset(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
