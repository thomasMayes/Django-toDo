from rest_framework import serializers
from posts.models import Post, Topic
from django.contrib.auth.models import User

# Lead Serializer


class TopicLister(serializers.PrimaryKeyRelatedField):
    def to_representation(self, value):
        thing = {
            'title': value.title,
            'color': value.color,
            'id': value.id
        }
        return thing


class OwnerLister(serializers.RelatedField):
    def to_representation(self, value):

        return {
            'username': value.username,
            'id': value.id
        }


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    # topics = serializers.PrimaryKeyRelatedField(
    #     queryset=Topic.objects.all(), many=True)
    topics = TopicSerializer(many=True)
    owner = OwnerLister(many=False, queryset=User.objects.all())

    class Meta:
        model = Post
        fields = ('title', 'description', 'owner',
                  'created_at', 'topics', 'id')


class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('title', 'description')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
