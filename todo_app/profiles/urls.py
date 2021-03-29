from rest_framework import routers
from .viewsets import ProfileViewset
from .views import UserProfileView
from django.urls import path


router = routers.DefaultRouter()
router.register('api/profile', ProfileViewset, 'profiles')


urlpatterns = [
    path('api/userprofile/<int:id>/',
         UserProfileView.as_view(), name='userprofile'),

]

urlpatterns += router.urls
