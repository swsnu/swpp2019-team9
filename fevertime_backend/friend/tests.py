import json
from django.test import TestCase, Client
from user.models import User

# Create your tests here.
class FriendTestCase(TestCase):

    def setUp(self):
        User.objects.create_user(username="test",
                                 password="test",
                                 nickname="test")
        User.objects.create_user(username="test2",
                                 password="test2",
                                 nickname="test2")

    def test_friend_request(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/',
                               json.dumps({'username': 'test', 'password': 'test'}),
                               content_type='application/json')

        response = client.get('/api/friend/request/')
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/friend/request/',
                               json.dumps({'nickname':'test2'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

        response = client.post('/api/friend/request/',
                               json.dumps({'nickname':'test123'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 404)

        response = client.post('/api/friend/request/',
                               json.dumps({'nickname':'test2'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 403)

        response = client.post('/api/friend/request/',
                               json.dumps({'nickname':'test'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 403)

        response = client.delete('/api/friend/request/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/user/signout/')

        response = client.post('/api/user/signin/',
                               json.dumps({'username': 'test2', 'password': 'test2'}),
                               content_type='application/json')

        response = client.delete('/api/friend/request/test/')
        self.assertEqual(response.status_code, 200)

        response = client.delete('/api/friend/request/test123/')
        self.assertEqual(response.status_code, 404)

        response = client.delete('/api/friend/request/test/')
        self.assertEqual(response.status_code, 404)

        response = client.get('/api/friend/request/test/')
        self.assertEqual(response.status_code, 405)

    def test_friend_real(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/',
                               json.dumps({'username': 'test2', 'password': 'test2'}),
                               content_type='application/json')

        response = client.post('/api/friend/request/',
                               json.dumps({'nickname':'test'}),
                               content_type='application/json')

        response = client.get('/api/user/signout/')

        response = client.post('/api/user/signin/',
                               json.dumps({'username': 'test', 'password': 'test'}),
                               content_type='application/json')

        response = client.get('/api/friend/real/')
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/friend/request/',
                               json.dumps({'nickname':'test2'}),
                               content_type='application/json')

        response = client.get('/api/user/signout/')

        response = client.post('/api/user/signin/',
                               json.dumps({'username': 'test2', 'password': 'test2'}),
                               content_type='application/json')

        response = client.post('/api/friend/real/',
                               json.dumps({'nickname':'test'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

        response = client.post('/api/friend/real/',
                               json.dumps({'nickname':'test123'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 404)

        response = client.post('/api/friend/real/',
                               json.dumps({'nickname':'test'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 403)

        response = client.delete('/api/friend/real/')
        self.assertEqual(response.status_code, 405)

        response = client.delete('/api/friend/real/test/')
        self.assertEqual(response.status_code, 200)

        response = client.delete('/api/friend/real/test123/')
        self.assertEqual(response.status_code, 404)

        response = client.delete('/api/friend/real/test/')
        self.assertEqual(response.status_code, 404)

        response = client.get('/api/friend/real/test/')
        self.assertEqual(response.status_code, 405)

    def test_friend_real2(self):
        client = Client(enforce_csrf_checks=False)

        response = client.post('/api/user/signin/',
                               json.dumps({'username': 'test', 'password': 'test'}),
                               content_type='application/json')

        response = client.post('/api/friend/request/',
                               json.dumps({'nickname':'test2'}),
                               content_type='application/json')

        response = client.get('/api/user/signout/')

        response = client.post('/api/user/signin/',
                               json.dumps({'username': 'test2', 'password': 'test2'}),
                               content_type='application/json')

        response = client.post('/api/friend/real/',
                               json.dumps({'nickname':'test'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)
        