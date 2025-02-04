import json
from django.test import TestCase, Client
from user.models import User
# Create your tests here.


class UserTestCase(TestCase):
    preclient = None

    def setUp(self):
        self.preclient = Client()
        self.preclient.post('/api/user/signup/', json.dumps(
            {'username': 'SY', "nickname": "SYLEE", 'password': 'Lee', "wrong": False}),\
                content_type='application/json')

    def tearDown(self):
        pass

    def test_signup(self):
        client = Client()
        response = client.post("/api/user/signup/", json.dumps({
            'username': "asdf",
            "nickname": "asdf"
        }), content_type="application/json")
        self.assertEqual(response.status_code, 400)

        response = client.post("/api/user/signup/", json.dumps({
            'username': "asdf",
            "nickname": "asdf",
            "password": "asdf",
            "wrong": True,
        }), content_type="application/json")
        self.assertEqual(response.status_code, 401)

        response = client.post("/api/user/signup/", json.dumps({
            'username': "asdf",
            "nickname": "asdf",
            "password": "asdf",
            "wrong": False,
        }), content_type="application/json")
        self.assertEqual(response.status_code, 201)

        response = client.post("/api/user/signup/", json.dumps({
            'username': "asdf",
            "nickname": "asdf",
            "password": "asdf",
            "wrong": False,
        }), content_type="application/json")
        self.assertEqual(response.status_code, 401)

        response = client.post("/api/user/signup/", json.dumps({
            'username': "asdf",
            "nickname": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            "password": "asdf",
            "wrong": False,
        }), content_type="application/json")
        self.assertEqual(response.status_code, 401)

        response = client.post("/api/user/signup/", json.dumps({
            'username': "이잉",
            "nickname": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            "password": "asdf",
            "wrong": False,
        }), content_type="application/json")
        self.assertEqual(response.status_code, 401)

        response = client.post("/api/user/signup/", json.dumps({
            'username': "",
            "nickname": "",
            "password": "asdf",
            "wrong": False,
        }), content_type="application/json")
        self.assertEqual(response.status_code, 401)

        response = client.get("/api/user/signup/")
        self.assertEqual(response.status_code, 405)

    def test_signin(self):
        response = self.preclient.post("/api/user/signin/", json.dumps({
            'username': "SY"
        }), content_type="application/json")
        self.assertEqual(response.status_code, 400)

        response = self.preclient.post("/api/user/signin/", json.dumps({
            'username': "SY",
            "password": "asdf"
        }), content_type="application/json")
        self.assertEqual(response.status_code, 401)

        response = self.preclient.post("/api/user/signin/", json.dumps({
            'username': "SY",
            "password": "Lee"
        }), content_type="application/json")
        self.assertEqual(response.status_code, 200)

        response = self.preclient.get("/api/user/signin/")
        self.assertEqual(response.status_code, 405)

    def test_signout(self):
        response = self.preclient.post("/api/user/signin/", json.dumps({
            'username': "SY",
            "password": "Lee"
        }), content_type="application/json")
        self.assertEqual(response.status_code, 200)

        response = self.preclient.post("/api/user/signout/", json.dumps({
            'username': "SY",
            "password": "Lee"
        }), content_type="application/json")
        self.assertEqual(response.status_code, 405)

        response = self.preclient.get("/api/user/signout/")
        self.assertEqual(response.status_code, 204)

        response = self.preclient.get("/api/user/signout/")
        self.assertEqual(response.status_code, 401)

    def test_user_get(self):
        response = self.preclient.get("/api/user/")
        self.assertEqual(response.status_code, 204)

        response = self.preclient.post("/api/user/signin/", json.dumps({
            'username': "SY",
            "password": "Lee"
        }), content_type="application/json")
        self.assertEqual(response.status_code, 200)

        response = self.preclient.get("/api/user/")
        self.assertEqual(response.status_code, 200)

    def test_user_put(self):
        response = self.preclient.put("/api/user/", json.dumps({
            'nickname': "SY",
            "password": "Lee"
        }), content_type="application/json")
        self.assertEqual(response.status_code, 401)
        # login
        response = self.preclient.post("/api/user/signin/", json.dumps({
            'username': "SY",
            "password": "Lee"
        }), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        # wrong data
        response = self.preclient.put("/api/user/", json.dumps({
            'nickname': "sy",
        }), content_type="application/json")
        self.assertEqual(response.status_code, 400)
        # good data
        response = self.preclient.put("/api/user/", json.dumps({
            'nickname': "sy",
            "password": "lee"
        }), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        response = self.preclient.post("/api/user/signin/", json.dumps({
            'username': "SY",
            "password": "lee"
        }), content_type="application/json")
        response = self.preclient.put("/api/user/", json.dumps({
            'nickname': "sy",
            "password": "lee"
        }), content_type="application/json")
        self.assertEqual(response.status_code, 402)

    def test_user_invalid(self):
        response = self.preclient.post("/api/user/", json.dumps({
            'nickname': "sy",
            "password": "lee"
        }), content_type="application/json")
        self.assertEqual(response.status_code, 405)
        # def test_user_delete(self):

    def test_social(self):
        response = self.preclient.post("/api/user/signin/", json.dumps({
            'username': "SY",
            "password": "Lee"
        }), content_type="application/json")
        self.assertEqual(response.status_code, 200)

        response = self.preclient.put("/api/user/social/")
        self.assertEqual(response.status_code, 200)
        response = self.preclient.get("/api/user/social/")
        self.assertEqual(response.status_code, 405)

    def test_social_specific(self):
        User.objects.create_user(username="test",
                                 password="test",
                                 nickname="test")

        response = self.preclient.post("/api/user/signin/", json.dumps({
            'username': "SY",
            "password": "Lee"
        }), content_type="application/json")
        self.assertEqual(response.status_code, 200)

        response = self.preclient.put("/api/user/social/1/")
        self.assertEqual(response.status_code, 405)

        response = self.preclient.get("/api/user/social/1000/")
        self.assertEqual(response.status_code, 401)

        response = self.preclient.get("/api/user/social/1/")
        self.assertEqual(response.status_code, 204)

        response = self.preclient.get("/api/user/social/2/")
        self.assertEqual(response.status_code, 401)

        # others in friend, group test

    def test_csrf(self):
        # By default, csrf checks are disabled in test client
        # To test csrf protection we enforce csrf checks here
        client = Client(enforce_csrf_checks=True)

        response = client.post('/api/user/signup/', json.dumps(
            {'username': 'youngjae', "nickname": "youngjae", 'password': 'youngjae', "wrong": False,
             }),\
                 content_type='application/json')
        # Request without csrf token returns 403 response
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/user/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/user/signup/', json.dumps(
            {'username': 'youngjae', "nickname": "youngjae", 'password': 'youngjae', "wrong": False,
             }),\
                 content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)  # Pass csrf protection
