from rest_framework import routers
from .viewsets import ProfileViewset
from django.urls import path


router = routers.DefaultRouter()
router.register('api/profile', ProfileViewset, 'profiles')


# urlpatterns = [
#     path('createpost', CreatePostView.as_view(), name='create_post'),

# ]

urlpatterns = router.urls
