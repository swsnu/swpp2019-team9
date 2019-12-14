import json
from locust import HttpLocust, TaskSet, task, between
class UserBehavior(TaskSet):
    csrftoken=""
    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        self.login()
        response=self.client.get("/api/user/token/")
        self.csrftoken = response.cookies['csrftoken']


    def on_stop(self):
        """ on_stop is called when the TaskSet is stopping """
        self.logout()

    #You should modify them with the username & password in your DB
    def login(self):
        response=self.client.get("/api/user/token/")
        self.csrftoken = response.cookies['csrftoken']
        self.client.post("/api/user/signin/",json.dumps({"username":"0", "password":"0"}),
        headers={"X-CSRFToken": self.csrftoken})
        
    def logout(self):
        self.client.get("/api/user/signout/")


    # # You should modify user_id
    # @task(1)
    # def fever_data_D(self):
    #     self.client.post("/api/fever_data_D/",json.dumps({"user_id":1,
    #         "selectDate": "Sun Dec 01 2019 00:32:41 GMT+0900 (한국 표준시)"}),
    #     headers={"X-CSRFToken": self.csrftoken})
    # @task(1)
    # def fever_data_W(self):
    #     self.client.post("/api/fever_data_W/",json.dumps({"user_id":1,
    #         "selectDate": "Sun Dec 01 2019 00:32:41 GMT+0900 (한국 표준시)","selectCateg": "0"}),
    #         headers={"X-CSRFToken": self.csrftoken})

    # #You should modify user_id

    # #You should modify user_id
    # @task(1)
    # def fever_data_M(self):
    #     self.client.post("/api/fever_data_M/",json.dumps({"user_id":1,
    #         "selectDate": "Sun Dec 01 2019 00:32:41 GMT+0900 (한국 표준시)","selectCateg": "0"}),
    #         headers={"X-CSRFToken": self.csrftoken})

    @task(1)
    def group(self):
        self.client.get('/api/group/')
        self.client.get('/api/group/leaderboard/4/1/All/')


    
        

class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    wait_time = between(5, 15)