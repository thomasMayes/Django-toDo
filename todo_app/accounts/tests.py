from django.test import SimpleTestCase,  TestCase, RequestFactory
from django.urls import reverse, resolve
from rest_framework import status
from django.contrib.auth.models import User
from knox.models import AuthToken
from rest_framework.test import APIClient, APIRequestFactory, force_authenticate
from .api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views


# ==================================== TESTING URLS===========================================
# Testing url is resolving to correct view

class TestAccountUrls(SimpleTestCase):
    def test_login_url_is_resolved(self):
        url = reverse('login')
        self.assertEquals(resolve(url).func.view_class, LoginAPI)

    def test_register_url_is_resolved(self):
        url = reverse('register')
        self.assertEquals(resolve(url).func.view_class, RegisterAPI)

    def test_get_user_url_is_resolved(self):
        url = reverse('get_user')
        self.assertEquals(resolve(url).func.view_class, UserAPI)

    def test_logout_url_is_resolved(self):
        url = reverse('knox_logout')
        self.assertEquals(resolve(url).func.view_class, knox_views.LogoutView)


# ====================================== TESTING VIEWS========================================
# Testing the view to ensure view returns expected response when provided a specific request

class TestAccountViews(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.create_user(
            username='jacob', email='jacob@test.com', password='123456')

    def test_login_view(self):
        url = reverse('login')
        data = {
            'username': 'jacob',
            'password': '123456'
        }
        request = self.factory.post(url, data)
        view = LoginAPI.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_login_fail(self):
        url = reverse('login')
        data = {
            'username': '',
            'password': ''
        }
        request = self.factory.post(url, data)
        view = LoginAPI.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 400)

    def test_register_view(self):
        url = reverse('register')
        data = {
            'username': 'jake',
            'password': '123456',
            'email': 'jake_The_Mother_Fuckin_Snake@netscape.net'
        }
        request = self.factory.post(url, data)
        view = RegisterAPI.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_user_view(self):
        url = reverse('get_user')

        request = self.factory.get(url)
        request.user = self.user

        view = UserAPI.as_view()
        force_authenticate(request, user=self.user)
        response = view(request)
        self.assertEqual(response.status_code, 200)
