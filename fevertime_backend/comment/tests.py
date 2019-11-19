import json
from django.test import TestCase,Client

# Create your tests here.
class CommentTestCase(TestCase):
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

    def tearDown(self):
        pass

    def test_post(self):
        res = self.preclient.post("/api/comment/1/", json.dumps(
            {'content' : "New Comment"}), content_type='application/json')
        self.assertEqual(res.status_code, 201)
        
        res = self.preclient.post("/api/comment/1/", json.dumps(
            {'dd' : "New Comment"}), content_type='application/json')
        self.assertEqual(res.status_code, 400)

        res = self.preclient.post("/api/comment/2/", json.dumps(
            {'content' : "New Comment"}), content_type='application/json')
        self.assertEqual(res.status_code, 404)
        
        self.preclient.get("/api/user/signout/")

        res = self.preclient.post("/api/comment/1/", json.dumps(
            {'content' : "New Comment"}), content_type='application/json')
        self.assertEqual(res.status_code, 401)
    
    def test_get(self):
        res = self.preclient.post("/api/comment/1/", json.dumps(
            {'content' : "New Comment"}), content_type='application/json')
        
        res = self.preclient.get("/api/comment/1/")
        self.assertEqual(res.status_code, 200)

        self.preclient.get("/api/user/signout/")

        res = self.preclient.get("/api/comment/1/")
        self.assertEqual(res.status_code, 401)
    
    def test_put(self):
        res = self.preclient.post("/api/comment/1/", json.dumps(
            {'content' : "New Comment"}), content_type='application/json')
    
        res = self.preclient.put("/api/comment/1/", json.dumps(
            {'content' : "Change Comment"}), content_type='application/json')
        self.assertEqual(res.status_code, 400)

        res = self.preclient.put("/api/comment/1/", json.dumps(
            {"id": 1, 'content' : "Change Comment"}), content_type='application/json')
        self.assertEqual(res.status_code, 200)

        res = self.preclient.delete("/api/comment/1/")
        self.assertEqual(res.status_code, 405)

        self.preclient.get("/api/user/signout/")
        res = self.preclient.put("/api/comment/1/", json.dumps(
            {"id": 1, 'content' : "Change Comment"}), content_type='application/json')
        self.assertEqual(res.status_code, 401)



    def test_delete(self):
        res = self.preclient.post("/api/comment/1/", json.dumps(
            {'content' : "New Comment1"}), content_type='application/json')
    
        res = self.preclient.post("/api/comment/1/", json.dumps(
            {'content' : "New Comment2"}), content_type='application/json')

        res = self.preclient.delete("/api/comment/delete/1/")
        self.assertEqual(res.status_code, 200)

        res = self.preclient.delete("/api/comment/delete/1/")
        self.assertEqual(res.status_code, 404)

        res = self.preclient.get("/api/comment/delete/2/")
        self.assertEqual(res.status_code, 405)

        self.preclient.get("/api/user/signout/")
        res = self.preclient.delete("/api/comment/delete/2/")
        self.assertEqual(res.status_code, 401)
