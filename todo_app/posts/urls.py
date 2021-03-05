from rest_framework import routers
from .api import PostViewSet, TopicViewset
from django.urls import path
from .views import CreatePostView


router = routers.DefaultRouter()
router.register('api/posts', PostViewSet, 'posts')
router.register('api/topics', TopicViewset, 'topics')


urlpatterns = [
    path('createpost', CreatePostView.as_view(), name='create_post'),

]

urlpatterns += router.urls
