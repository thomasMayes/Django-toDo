from rest_framework import routers
from .api import PostViewSet, TopicViewset, UserViewset
from django.urls import path
from .views import CreatePostView


router = routers.DefaultRouter()
router.register('api/posts', PostViewSet, 'posts')
router.register('api/topics', TopicViewset, 'topics')
router.register('api/user', UserViewset, 'user')


urlpatterns = [
    path('createpost', CreatePostView.as_view(), name='create_post'),

]

urlpatterns += router.urls
