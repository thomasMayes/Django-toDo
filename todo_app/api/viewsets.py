from rest_framework import viewsets, permissions
from . import models
from . import serializers


# class UserViewset(viewsets.ModelViewSet):
#     queryset = models.User.objects.all()
#     serializer_class = serializers.UserSerializer


# class TodoViewset(viewsets.ModelViewSet):
#     permission_classes = [
#         permissions.IsAuthenticated 
#     ]
#     serializer_class = serializers.TodoSerializer

#     def get_queryset(self):
#         return self.request.user.todos.all()

#     def perform_create(self, serializer):
#         serializer.save(owner=request.user)


class TodoViewset(viewsets.ModelViewSet):
    queryset = models.Todo.objects.all()
    serializer_class = serializers.TodoSerializer