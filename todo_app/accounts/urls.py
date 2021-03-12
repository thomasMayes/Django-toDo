from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI, FindUserAPI
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view(), name='register'),
    path('api/auth/login', LoginAPI.as_view(), name='login'),
    path('api/auth/user', UserAPI.as_view(), name='get_user'),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/auth/finduser/<int:id>/', FindUserAPI.as_view(), name='find_user')
]
