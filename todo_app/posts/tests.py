from django.test import SimpleTestCase,  TestCase, RequestFactory
from django.urls import reverse, resolve
from rest_framework import status
from django.contrib.auth.models import User
from .views import CreatePostView
from knox.models import AuthToken
from rest_framework.test import APIClient, APIRequestFactory, force_authenticate

# ==================================== TESTING URLS===========================================
# Testing url is resolving to correct view


class TestPostUrls(SimpleTestCase):
    def test_create_post_url_is_resolved(self):
        url = reverse('create_post')
        self.assertEquals(resolve(url).func.view_class, CreatePostView)


# ====================================== TESTING VIEWS========================================
# Testing the view to ensure view returns expected response when provided a specific request

class TestPostViews(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.create_user(
            username='jacob', email='jacob@test.com', password='123456')
        self.token = AuthToken.objects.create(self.user)[1]
        # self.client = APIClient()
        # self.client.force_authenticate(user=self.user)

    def test_create_post(self):
        url = reverse('create_post')
        data = {
            'title': 'test',
            'description': 'lorem ipsum'
        }

        request = self.factory.post(url, data)
        request.user = self.user
        view = CreatePostView.as_view()
        force_authenticate(request, user=self.user)
        response = view(request)
        self.assertEqual(response.status_code, 201)
