from django.shortcuts import render
from .serializers import TodoSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Todo
from rest_framework import generics, status

# Create your views here.


class UpdateTodo(APIView):
    serializer_class = TodoSerializer

    def patch(self, request, format=None):

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            print('valid')
            # guest_can_pause = serializer.data.get('guest_can_pause')
            # votes_to_skip = serializer.data.get('votes_to_skip')
            # code = serializer.data.get('code')

            # queryset = Room.objects.filter(code=code)
            # if not queryset.exists():
            #     return Response({'message': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)

            # room = queryset[0]
            # user_id = self.request.session.session_key
            # if room.host != user_id:
            #     return Response({'message': 'You are not the host of this room'}, status=status.HTTP_403_FORBIDDEN)

            # room.guest_can_pause = guest_can_pause
            # room.votes_to_skip = votes_to_skip
            # room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
            # return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

        print(serializer.errors)
        return Response({'Bad request': 'Invalid Data'}, status=status.HTTP_400_BAD_REQUEST)
