from posts.models import Post, Topic
from rest_framework import viewsets, permissions
from .serializers import PostSerializer, TopicSerializer

# Lead Viewset


class PostViewSet(viewsets.ModelViewSet):
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.all()
        # return self.request.user.posts.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TopicViewset(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
