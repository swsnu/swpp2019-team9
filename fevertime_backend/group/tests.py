import json
from django.test import TestCase, Client
from user.models import User
# Create your tests here.

class GroupTestCase(TestCase):

    def setUp(self):
        User.objects.create_user(username="grouptest",
                                 password="grouptest",
                                 nickname="grouptest")
        User.objects.create_user(username="grouptest2",
                                 password="grouptest2",
                                 nickname="grouptest2")
    def test_group(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/',
                               json.dumps({'username': 'grouptest', 'password': 'grouptest'}),
                               content_type='application/json')

        response = client.get('/api/group/')
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/group/',
                               json.dumps({'groupname':'test'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

        response = client.post('/api/group/',
                               json.dumps({'groupname':'test'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 403)

        response = client.delete('/api/group/')
        self.assertEqual(response.status_code, 405)
