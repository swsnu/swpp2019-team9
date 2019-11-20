import json
from django.test import TestCase, Client
from user.models import User
# Create your tests here.

class GroupTestCase(TestCase):
    preclient = None
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

class GroupMemberTestCase(TestCase):
    preclient = None
    def setUp(self):
        self.preclient = Client()
        self.preclient.post('/api/user/signup/', json.dumps(
            {'username': 'SY', "nickname":"SYLEE",'password': 'Lee',"wrong":False}),
                            content_type='application/json')
        
        self.preclient.post('/api/user/signup/', json.dumps(
            {'username': 'YB', "nickname":"YBLEE",'password': 'Lee',"wrong":False}),
                            content_type='application/json')

        self.preclient.post("/api/user/signin/", json.dumps({
            'username' : "SY",
            "password" : "Lee"
        }),content_type="application/json")
        self.preclient.post('/api/group/',
                            json.dumps({'groupname':'test'}),
                            content_type='application/json')
        self.preclient.post('/api/group/',
                            json.dumps({'groupname':'test2'}),
                            content_type='application/json')

    def tearDown(self):
        pass

    def test_getMembers(self):
        res = self.preclient.get('/api/group/group_members/4/')
        self.assertEqual(res.status_code, 404)

        res = self.preclient.get('/api/group/group_members/1/')
        self.assertEqual(res.status_code, 200)

    def test_postMembers(self):
        self.preclient.post('/api/group/group_members/2/', json.dumps(
            {"nickname":"YBLEE"}), content_type='application/json')

        res = self.preclient.post('/api/group/group_members/1/', json.dumps(
            {"name":["YBLEE"]}), content_type='application/json')
        self.assertEqual(res.status_code, 400)

        res = self.preclient.post('/api/group/group_members/1/', json.dumps(
            {"nickname":["SYLEE"]}), content_type='application/json')
        self.assertEqual(res.status_code, 201)

        res = self.preclient.post('/api/group/group_members/1/', json.dumps(
            {"nickname":["YBLEE"]}), content_type='application/json')
        self.assertEqual(res.status_code, 201)

        res = self.preclient.put('/api/group/group_members/1/', json.dumps(
            {"nickname":["YBLEE"]}), content_type='application/json')
        self.assertEqual(res.status_code, 405)
    
    def test_deleteMembers(self):
        res = self.preclient.delete('/api/group/group_members/1/')
        self.assertEqual(res.status_code, 200)

    def test_groupadd(self):
        self.preclient.post('/api/friend/request/',
                            json.dumps({'nickname':'YBLEE'}),
                            content_type='application/json')
        self.preclient.get('/api/user/signout/')

        self.preclient.post("/api/user/signin/", json.dumps({
            'username' : "YB",
            "password" : "Lee"
        }),content_type="application/json")

        self.preclient.post('/api/friend/real/',
                            json.dumps({'nickname':'SYLEE'}),
                            content_type='application/json')
        
        self.preclient.get('/api/user/signout/')
        self.preclient.post("/api/user/signin/", json.dumps({
            'username' : "SY",
            "password" : "Lee"
        }),content_type="application/json")

        res = self.preclient.get('/api/group/group_add/4/')
        self.assertEqual(res.status_code, 404)

        res = self.preclient.delete('/api/group/group_add/1/')
        self.assertEqual(res.status_code, 405)

        res = self.preclient.get('/api/group/group_add/1/')
        self.assertEqual(res.status_code, 200)
