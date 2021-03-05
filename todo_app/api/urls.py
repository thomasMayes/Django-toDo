from django.urls import path
from .views import UpdateTodo


urlpatterns = [
    path('update', UpdateTodo.as_view()),
]
