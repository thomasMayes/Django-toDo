from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('accounts.urls')),
    path('', include('posts.urls')),
    path('', include('profiles.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
