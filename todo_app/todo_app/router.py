from api.viewsets import TodoViewset
from rest_framework import routers

router = routers.DefaultRouter()

router.register('todos', TodoViewset)
