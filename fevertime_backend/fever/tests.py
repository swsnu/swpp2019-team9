from django.test import TestCase, Client
from user.models import User
from django.contrib.auth import get_user_model

from fever.models import Fever_history, Fever_progress
import json
# Create your tests here.
class FeverTestCase(TestCase):
    def setUp(self):
        user1 = User.objects.create_user(username="youngjae", password="youngjae", nickname="youngjae")


    def test_fever_history(self):
        client = Client(enforce_csrf_checks=False)

        response = client.post('/api/user/signin/', json.dumps({'username': 'youngjae', 'password': 'youngjae'}),
                               content_type='application/json')

        # 405 테스트
        response = client.patch('/api/fever_history/', json.dumps({'id': '1'}),
                                content_type='application/json')
        self.assertEqual(response.status_code, 405)

        # POST #200 테스트
        response = client.post('/api/fever_history/', json.dumps({'category': 'Study','etcCategory': ''}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)


        # PUT 200 테스트
        response = client.put('/api/fever_history/', json.dumps({'id': '1'}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_fever_progress(self):
        client = Client(enforce_csrf_checks=False)
        # #200 테스트
        # response = client.post('/api/fever_progress/', json.dumps({'image': '1'}),
        #                       content_type='application/json')
        # self.assertEqual(response.status_code, 200)

        #405 테스트
        response = client.delete('/api/fever_progress/')
        self.assertEqual(response.status_code, 405)

    def test_fever_exception(self):
        client = Client(enforce_csrf_checks=False)
        #200 테스트
        # response = client.get('/api/fever_exception/')
        # self.assertEqual(response.status_code, 200)
        #
        # #405 테스트
        # response = client.delete('/api/fever_exception/')
        # self.assertEqual(response.status_code, 405)
