from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from .serializers import PostSerializer, CreatePostSerializer
from .models import Post
# Create your views here.


class CreatePostView(APIView):
    serializer_class = CreatePostSerializer

    def post(self, request, format=None):
        print(request.user)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            #    print('valid')
            title = serializer.data.get('title')
            description = serializer.data.get('description')

            post = Post(title=title, description=description,
                        owner=self.request.user)
            post.save()

            return Response(PostSerializer(post).data, status=status.HTTP_201_CREATED)

        else:
            print(serializer.errors)
            return Response({'Bad request': 'Invalid Data'}, status=status.HTTP_400_BAD_REQUEST)
