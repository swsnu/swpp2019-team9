from django.test import TestCase, Client
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from fever.models import Fever_history, Fever_progress
import json
# Create your tests here.
class FeverTestCase(TestCase):
    def setUp(self):
        user1 = get_user_model().objects.create(username="youngjae", password="youngjae")


    def test_fever_history(self):
        client = Client(enforce_csrf_checks=False)
        #200 테스트
        response = client.post('/api/fever_history/', json.dumps({'category': 'Study'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)

        #405 테스트
        response = client.put('/api/fever_history/', json.dumps({'category': 'Study'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 405)

    def test_fever_progress(self):
        client = Client(enforce_csrf_checks=False)
        #200 테스트
        response = client.get('/api/fever_progress/')
        self.assertEqual(response.status_code, 200)

        #405 테스트
        response = client.delete('/api/fever_progress/')
        self.assertEqual(response.status_code, 405)

    def test_fever_exception(self):
        client = Client(enforce_csrf_checks=False)
        #200 테스트
        response = client.get('/api/fever_exception/')
        self.assertEqual(response.status_code, 200)

        #405 테스트
        response = client.delete('/api/fever_exception/')
        self.assertEqual(response.status_code, 405)
