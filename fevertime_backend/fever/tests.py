from django.test import TestCase, Client
from user.models import User
from django.contrib.auth import get_user_model

from fever.models import Fever_history, Fever_progress
import json
# Create your tests here.
class FeverTestCase(TestCase):
    def setUp(self):
        user1 = User.objects.create_user(username="youngjae", password="youngjae", nickname="youngjae")
        user2 = User.objects.create_user(username="youngjae2", password="youngjae2", nickname="youngjae2")
        history1 = Fever_history(category='Study', user=user1, etcCategory='')


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

        # PUT 404 테스트
        response = client.put('/api/fever_history/', json.dumps({'id': '100'}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 404)

    def test_fever_progress(self):
        client = Client(enforce_csrf_checks=False)
        #200 테스트
        response = client.post('/api/user/signin/', json.dumps({'username': 'youngjae', 'password': 'youngjae'}),
                               content_type='application/json')

        response = client.post('/api/fever_progress/', json.dumps({'image': '1', 'id' : 0}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 404)

        response = client.post('/api/fever_history/', json.dumps({'category': 'Study', 'etcCategory': ''}),
                               content_type='application/json')

        response = client.post('/api/fever_progress/', json.dumps({'image': "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCACgAKADASIAAhEBAxEB/8QAHQAAAQUBAQEBAAAAAAAAAAAABQMEBgcIAgEJAP/EAD4QAAIBAgUCBAQDBQYGAwAAAAECAwQRAAUSITEGQRMiUWEHMnGBFJGhCEKxwfAVJFLR4fEJFiMzYqJDgpL/xAAbAQACAwEBAQAAAAAAAAAAAAACAwEEBQAGB//EACYRAAICAgICAgEFAQAAAAAAAAABAhEDIQQxEkEFE1EUIjJhcYH/2gAMAwEAAhEDEQA/ABDOIUXwyLhtVmNzglI3iyKytYyKOecBQX8rKxBUG+HaVPiUiHYFDpJ9sZsZeSVFppofRSAXUADe1798diW0sbhiLEEn74ZRykMNrgkja2O5pAArKSSTtv8A17Yfji2yHSJ1G5ZVc23FxtjqSV0iZL7sO/0wMp6otHG9j8g5OHTzgRuw3LAjCXFpaJ72gNBLbWCbgMefS+FvF9Dvx9sDIJiGlUDfW1/zws02q1jYn1GFRWyXXY9pXLZpTDewPP8AnhwZAZi1wSWO98DqKc/jtYPlCHv/AFbHccoJVkN9+/BxYdWkA9Ow2kqhFJYADn3wOeQVWZRRKOWLc/b+eP3jEp2JAuL466cQ1Wc+Y3CEA22tbf8Ayw+Gl5MFu2WZRgU1LHEkgtGoF/a2Famtio6aWrqDpSFGkPfYDDOOUBNyLc29MBurK4mhhoY3CmslEbeoQeZvtYAffFeTvQdojFRJLWz0NDItpKmRqyoX0LkkX+18SAVCSVjvGbpHZFAvbEYyqsE9TX51sF/7VPc39h+mCdBMQoDXN9tuMLkn6OVXRJBUMhWzbE3Y49eos5Om/Jv3OA61b6bsLLsPvc48SqcXVrNbj0wUYtnWEqjMYaOJpibBVvY3wMoRO0jVMuoyTvqYHttsuGNZVNW1Qp4yTHGA8hta/oP54kPTdIs0glIOhNwxN7+36YemoK2DJ30UYcuz6MXWspJbW+aJlB+9zh3RLX+DPBX+EHaxXwzsB67jBWOpoZbAVUVuR5hj3wqKZrrURs1tN9QvinD+I6XewQk+ZJGpWgEnBuky2/W2PZ8yrE3mymqC+qqrg/8A5JxIIaZFj8NLEDi2PWpGIINrfTD8cpdoFpi2V1hmooZyrLdPlZbEfY4frUtpO5BsecBRI0H/AEyDbe1vrhVasNdQRe354JxBv8AilzijasqIHqk1JMw06hcWPfBEVEJUBJlN/wDyx6mV0crvNPSQuXNzqQN9OcdHIcrexFBTi/8AhjAxTipexs2mtHNHOwlncMPLHYWwtBM91se18JQ5NHTx1EUMOhJ7AlSQeLfUY4Tp2KOxjqKtbW/+Ym353xbi62hb3oeyzsiXJ4wW6KVo0kqXUlpCdx7n/IDEYq8kqmi0pm9WPQkIf5YO5LI2X0iQs5IA54OG+TcGgfFE4NYwBBAHBN+cQTrbPA1ZVmJgWp4VpYgDzLJYt/6kYJvmyRq87sdKC5tvtbEEJqcyzOjgeALrL5hP5twzN5Vtxb5vywpQSO/wkMH9zoKXLUW+hfEc+5wRjqJYgvmsBzcbYCI1d40jnLmkS91IkW5H0J2w4/HVKAB8sqgOdlDX/InELvoLxfYXNSwPzEAHffbCdXXNBCWIGoWAF73Pb74Ftm8e3i09VGSAbNA+33tbCMFYmYVQeIHwITYagRd/Ye388Oik2BJMPZRTuzpq3kc3fvdjv+WJ/QxxUsKwKbkC7HERyYJAFmf5jtvsPfBj8eFkLM4UAXO+1u5vhGbI3KkTGPijOrGvT5qMkm1wJV27dyMeCSrWQn8DUW3JsoP3wcnZGkSnEa+a98OI6ZbEOg+p7+5xXhna0xyx/kD09fJGw8lStzY+Rth9bYIxZ6kYAkrZECnlgRh7BSqQfKqg9xbfH4Ux1izsth74Ys8WtEO10NlzyGZyXq0Zr6d23GFlr4S11nQ3G9rccYa51X5bkNDJmucTQwUsItrkCm59Be5JPoN8VBnfxzoGlZMoyWAqwKiWcXY//VbAfcn6YfijLM/2oCc1FbL4hz4RoE8SIsthve+OW6vpICY5J6VWG+lpLG3rzjM7fEPqjMUeagogq/Kzxpe3ptuB9LYK9PVObVB/EVUUs0827atlUemlCLc33Avi2vjb22IlnrpGh6brCjmu0axS2F/+nKDh4vUtIVBkgZdXe4xSQr6uWKNZoJnkuW0xSrFGpF9rkWA/XH6ev6l8GP8AE1EVOCoA8KoZza2/Ox9eMS+AktMH9TbqSLxGeZa1kCSLt3Xa32wy/taPe2oAk2+mKKoeu8xyZjT1WZrWopF3kXvvsLbnB/L/AIkLmF5YGgZUXU+58ov6W/1wmeDJBWxqmmW1HU09T/d3nAjb5iWtt6XwUpUyhJGkFRAGVQobUNwO364rfL89fNWMNBU0c7gA6IpdRG3pbbBQrmqi7ULG2wsRx98Je+2GqZY0CUTppSWNmbghhthwaWNtiWuPTFZiqqVG9FKrDg7N/A7YVjzWeInWlWhH/g38sAl/YVk+moNPDC/1wzqY46d1eQc8WGIl/wAxTIgIqZxfYX1W/XHMvUSTMpmrQxTa7Ne38sMjJoGiYR5qoJBYg7abkW/LDgSNmUDJLYxt5TtYEYgqZtHsVmBXkEG98FafqmdVVY2jsu1+36YXOEmrRKTQPFGBUKLX0rvsLEk/6Yfx0Q1fKADsfTDiGPU0j2JubDf0/o4cxwlQDtjPoZ52NlpBpIIF+23bDHqHNct6byapznNJfCgplLMxIF/QC/c8DBqQpCrSOwTSt2JOwA774yp8a/iYer81bLaCob+y6FiqKreWWQcuR39B9z3xa43Heefj6AcvZFuv+vc060zZ8wqah4qYErT0ynywrb9Se5/lgLliHUJTAjxxC+qe+hd/tf6b4Z05pYDqnQ1Dkna+y3wpLVyzOqu40jdFsbY9HCCjGkU5ScmywshfPsxqh4k1PDRwX0gQKEJO/wAu36+vGJRXB8myhaior2UTm1PDHpUkkjU3G4+3tis8o6obLonlWUNNEvlDm4ubb2POPY+qs0nqvx1XVvU1LbR3ICqO2neygW9sMT10V2m2XFk8T02XRyS1c8ssh1FSWuzEbi3+x+mGUxzDMKyamjpliKggLfwltYX3G5773xCct6+qqbwY1dEa9nfUQb9x342w4HUEdRmT10eY+KSwus9y7tfYDsMc5JaZzjL2PMw6erFjKGkjDM/nk2aPT3se5H88RHMBm9BXJHHIIo1QK7Rx6b37bfz9MWTlOdVtQZWqK2njpQFvEkJLgm9ybg8WFr4Z181Bmjx5dHKJi7E6iAqoo73BH8N8BOGrCjP0V8mf5rllWJY1anmB1q4JUnuDxtjRHwa+JqdTUkeQZ/KyZog8jOLeKoHr684pPN+nat6topPBMB8sRuAL7bep5/XHeTUWa0lM+Z5TKySUjBwV2Ycff2GKebjxyxocsiXRsNKGF306CSPa+HH9iQONZiTTz8gJ+uI98GuvMu6/ypYaoJDmVMNE8LckjuPY4tGDKHW4eHY3++MTJF45U+yz5qiGf8u0hXakUk7ja2EpelaQg66FSOCAxviw4cpGjR4YFu3thM5Xe5MSgEXG3bAJtbJtMrl+icslO9Jp/ea4vhNuiMvIVhCQL22AxZ6ZKWB0op2vvvhRsnYqAVAZdtuMF9skuwrKpp4wi/IL3vv774XVVPI4/PCqR2WwXcY/StHBE80rhEQFmZjYADknC5Je0TZTH7Q3XlRkmWx9KZXUBJ8wQtUlfmWHgLf/AMjcH2GMySxmxZtyx3/2xNPiR1Q3VPVVfnEpYxtIUpgDxEvH8P1xDpotRUOxBI234H9euPQ8PD9ONJdlecldDSaQgmOOTy2sSB3xxGzIVkC6VUW0k7HClmS2kWJH1OE5WAJacnjy222BxaUnQtV7OUAmYmQiw4JA4w5ofDlcI4KheDfcn64YPJqisU81/U8YWRlhGtpPkFio4P0BwakwXp6QdppaPU17SOTYErx7ntg1k0tHQ1aOvgyvcE6CLD1BviKUckbHxIo9CghiHsV9dzhejqtL2SYBGcE2F7n3xLSFtN9ly5PVR00UksNFEisSzeUMp2vqLE+3bCFckEsD1sOYw0kkjWZYW1BgOxO3JGIhSdWeGEWJZZUTy73AY24AHOJZl8VLnGiKoppJzqAsGFgfRjsB9z7b4K7iKja2xOkeglZYairnlDNqLO629CBYevptzzhlnOnLoaqakdDIxSILHza99wdjzg/mHTVFRA1lLSosjsPDY7i9+QeduLjjtiMVORZlT18c9RThRGfFMUZIBT37n74XNUhqabtC/RvVmYdLdWQZqInhljkWR1C21R8kEH1GPoJ0VVw9S5FTZrSt4scyBwQeScfP6thgrpTn8KIPChQPHqJawsNx2JAO2Nw/sm14zTo05LLPHIcvl0xC9iFI1WIxk87DaUkMjlV0yxjlboAJF0+m2+OmyqOVbhBbYHbviaHKI3hd5Yhcd99/b64Hf2Y7GwSwPBJxlzgxqaI2uUeEl0HmtsDvjsZYxbzAGw5tiS/gbkKrbgWNh2x0tDuAVtp4sL4XehilbMyJCy8i1/fEM+MebrkvQWZsJNL1Mf4VLGxJfbt7XxYAh1Ek3AHp3xX3x0yWnr+hKtpU1vAyzRAMR5gedvYnFnHUppS/JM9qjIdTAqRszgkA2DbbHAeSMlSwu1yRe++DlUQgVCRvckE249r4FVOvWFjHlI8w22/0x6JCK2DpiFXQL3NuR/D9cJS+RvDkQ22BPOHsyxhBGy78iw4H+eObDUEA1Hkm3GJXeyKt2D2QszPY2HmF/wBcKRXBcFQVkjsNu+1sOPC0kBjue/Ixy6j5Q11Frk++GNJqzkNyxG9rADi9v5fTC0JZNowdiecdFFYAnYAAnbm/bCYjk0hULXPsCMQdSXQTy+sqFnVYTZ73szW4+4GJz071BQ5ShOZuHje2yP57/XhR9N8VqdVyqWVlFgb2ucOssZmqYhOEUbamk+UG+x9MBtbIlFSRb0nXCZrJDTUMwhiVr3kUKAD7W3H3/wA8e1ecGWSOnmqPGNXePxFU2I2AABv/AJbYG9NUuQpOJqiSnkePRy3iXtxpBNvXElziiyb8K2Yx6/GU2iB3s3b+J2Hrgm0KpJ00Cqzp4SZNNLRq8Uxsb7DUEIubDGzP2EauPM8jqcumphJUCdU17XWy76hza42PG2MdpWVlBlKlYGLlD4ev95b397Xvv9cbd/4ZdNRVlb1VUxUTtFFDAwdxdUkLNcC5vf7duRhOePlCjls143RtRDCZliEiAam7EjEazLIhFYopTe/h8fwxc1h64iee5ZSxOZ2If/ApxnZcUXHQf8SsXpNFlMZXewwmacWDL22seTg/UwiZyXOlgbDDFqV7giPYcm/GMyUfFjv9MmrCzrbRbvc9/XEG+NSuvw9zVmUkIi8G21xfFkGDxNlJAG5sO2Iv8TMjGa9FZpSIoDmmcqL27c/XBwajNSYxmDq+dQxCRooY2F++GrojJqUbW1AH1w/rgiysttaoSF7g/Q4HsjLcMQoA77973tj0d6FbsayyG6llBIAtfn6YbXcagWAuL2HfBCRGlTWwICAKSBbe2GMsR03uANxsO+OSJSs8heQkkodx2Fxj1WjVdJF2vcjtfHia2GjSx8RiTYff+WOmo5mcqikkdrX+lsGppbJUGxQSF9KDkngbY7KIN4zzsAR74TXLKqzJ+FY6jt5D79v64xJMr6HzYxNX16/hacXJZ+b+wtviPNexkcMm6iRkU24UK+pWsb7hffDygyarrp1jgDvqP+G4Hvx/VsTPKOhc16jnWPK6FzTgWMjpYNY77YvDpL4P0PT1IhmgV5ZLXZhYk+mK2XkRxIu8f4+WV09IpXLema6gpw+hjJItoxc3AI2J9OeMEGo66mqIpKh3McQ1MNV9Jt2/LGgk6QyRD4dVVwJJLbTv+96n0A4tgNmfRdFJVT0Uehwt1BVufbFD9Y4ytot5PjIeP7WVJUZwmbRwyQkRxRiSLY2IOkWtt7Df/TGsv+Hr8Xcu6I6yreiM0CrS58qBJfw+p0nQGy6xc6SDxxsPfGIcwE+QdSVeVzR2SCZk2vxe1vyxsb9h/pKnrur8vzb8MdBkbz8ozCxA9VYc3B7/AExqSknC2ecyY3Buj6a5nmP4SJXQBgwve/bETzXMTWykSDzDYb2th/ndYCVg1LdBp2NyRgDLqJDbauN/XGXyMvpEwV7Y3qFBk8u57nnDeSJmItv64etFyQoXfewv98eSAEgbEW9MZ7f5GpGSVp2IDspJHZe2G+YZdHmVDU5fOvkmjKNfuD2OCSq5awUgDc72thc07HUQpuF07b898FKL9DU7Pnj8XumavpLqysoCtkklLxC1gU1EAgDtsfywJ6JyKTrDOlyeGIoCCWPykWxon9qP4cvVQf8AMdNTnWiedzxp3NgB335xWn7L+U/ieupXkRLJTG1+b6h/LGrjzeWG32FhxqeRRZHOpfhh1F09UNSrRSzxbaZVW6kHHGQ/CLqDMlWaTL5WW1yNOm9/c2xtbOMkphEJGgWy77i+35YjyzZRGWhUKGI4Fr4UuU6pmyvjcal5Nmd4vh7W5bSfg06SSaQ7+IJbHj3xKOmui6SMCOq6UFOCttwOe5Prt64nWc1dBR1BL1iRrufOwHf3OGUHUMEmlUnV7k6SrAg253wvJyZyjpFzDxMEZLY7pPhh06rI8eVwEbk6lBBG22+H8vw7yWqjMVVTqsIItEgsrem3f6YLZBOK2EtH8qi+/F/6vh7mtQKSCNm0kEfu3A5/r88V3nnFGpHjYa0iI1VDV5VHo6ey2ON0Hh+wA4wKjyn4hZyQMxr44o+SVup+m2CeZdULQjxpW0re1z3OAFF8cuiqCsloq7MJWkDlGVadm3Bta/fDccsmSNpFXPDDF1KVEnyf4dV7TGqq6yaSTTp1iQ3t9/8APFkdBfB7xq78Qy3exNyNz9TiMZR8UqKuzCPJsmyevrKpyumNYRc34HONN/CfKs5MXj55kz0MzD/tkhrfUjGdyeRmgqloj68XcD55/tK9A1XTXxNaJI/DNWiPH6EkkfxGNif8P/ptqbLsyzWqppIp41XUD/iPceouD22scRX9tr4ePW59kGc0lC7hYpPGKreyhl3/APb9caL/AGecuiynoilYUqQPNGNbBbAtvcj2OxA9zjTw8m+PGzy3yeBxytrplsVzxyNqNlPFx3OGIF7l7X7g4X1mVQHOy7A2xxYEGw73GK+SbbKCjQioIa7Dbt9MdFS19NxYYcpFrI1LuB3x68Y08i18Jasla2ZLjCKNRHbTe9gMOIlcga9gTxbCKRBnUqpvp3F8PI7hLBW9Dc8D6YYkPTbZGviD07Hn/SWYUUsOpvBdkNvlYDY/Y4zZ8CukanpjrWpFQkiq8BCn90G4/kMa7EEU0bwTAsHU3BNwcVrLkFL07m0k0cY1PMSptsQw4+2H4W4po0/jsayNv2g9mUbz0XhggMNr8/r98VR1d0ZHXK4BERJuSoG5/rti4MuV6yNl0jcW39PpgPnfT8scTSuAdJv5dtv98dW7ibsMX2KmZY67+F+Y55UwS/i0ieABNSn51HBINhfDzpXojMaempKMVVQqZe/iAIdPiMSSb2Nzc4uKrydZJmZt7G9rcfnh/ltBSQlYo4huASSN7jBPPklHwYMODjU/OhjkNPPAFaS+ki9r2/PBaHIqvqR5YIG2iQkm/a/H1wQEFNAoT5bDgi98Tn4dUDVUs0MUK3fzGw3+2K2WDjG2amOorRnvqfoirn/uFdTFlSQvHcbau+IxlPwhy98xWqky4eLrurAb37c7Xxq7rLpullZZJYBeNxz3v/thrl/T+WVEa/3dDpO5A4OF4M81HxQrJxceR+TEvgj0LlPT1QlfLRxrM3zOd3b1ufsMaoyWopKlFdFSygKDb0xQ+TUr0QCxvqudgTbbFiZDm7U4Gq41WFvTFXIm3bAycdVolXUnRmU9aTmmzSi8eKOnbzAfICR/G36YVyXKaTI8thy2iXw4aZRGgA4AwPj6impcwk3migEKLNPe6WJPlPv78Wx71L1n0/0nl82YZ3mMUMcMTTvd1U6B+9uQLdr8XOLfGxSaSins8j8rlXmoX0SaErYDT9774cqy9gb++Kk+G/xO6l626a6i6pzfIaTpWmi36aTNqtVOYrouHe3yITpswuDq2vpuZXXfEHK8gybKq3PqijWrzCQ0skVLUeLFBUab6GkIUAbgXI7jtvi5k4maCujKU4vZNLqXAJtbuMceMUWzElf44q3K/jbFWZNS1uY9NVmX5hKmqaja7GA6mUXewVgdNwRsQR3uA5PxG6irJ0hyjpOvnVgCJBHYD9D/ABwv9PN6bS/6E77RSqhtZkVgLjSdvTDunJYKzk77cc4Z077szeZhuQMO1kWNSA5JXa3IGAi0tjEq2Ooyhu6A77m2BfUmRvW0EkkLKHQ+J5lJ432PIwL6u+I/SPQeWyZn1HndPSiONnWFnHiSkC9lTknbGRuvf2z+u+o3qaPphIsiyyQsiNGPEqGTe5LHYE37Db1xZw8fJm/jpfljMXIlhl5QezWOUTFQsmsC/wBzgtXAVVO7G5NtvQ4qf4JdYr1n0PlmZy1DtOY/CmJN2EiGxJ+wB++LNimbzROW+XfviHH65ODPX8ef2QUkRXMqSNXPk27g9jiJZ9nK5HEJ0UvIXVY1HBJNhid5mw1FSgNwDuLEYgXUdH+Ir6OZmOmnqFkK+qqb4G49mlFNpBLLK6eqHjVMZEigHfgYub4S1MVLmUdS7eU3HN+RimpOpMtpauCJlsH8th2774leR9ZUWUM1Y73VvlseB62xGVqUdBwhtpl+dc9JSdS5JVjJisVYkbTwX/eYbhfvuPvimuks/SqRIn8rk6WVr3BBwrl37QlZJXmLLoBJHBswfk4iuUVRnzyszB10/iKp6gJ/hDMTb674pYl4O6GKFKi7cuKeGDJp8vJHr74M0LGSVCmoKPa1ziE5TnSOPOf3gt+OcTCkzOIJHpJ1ehG98V8u57K+ZNRdEi6C6gybqTqDPOmFnSWopJFiqIGO8ZKAg2PY35xFviv0l05BkOb5N1bl9dVVTov9mTxvqATgxMDcWN8YL63+Jec0PxHz/qnIM8q6CSpr5dElLMYnZNfl8ym52A/LB2h/aj+LUNEtLmfUr5xTN5THmSCcjfbS7DWPsce1wcGsMXF7pHzHk5XLNKX5ZrH4WdD9PZzntPms9LIlFlUSLLltdHIY5G0FVG7LbRYG24O3bE2yj4c5d051dmHVUGWjP62rqGqaSprq02otQ80YUghVBGzKC1jbtc5o6A/aeilWODqAyUSP5TLES0Y9Lg7gfni0qP459NVtdBltJ1PRvNO4SKPxd39B6A/XGLzI8uMnGcXX9bQeOUapM0BkeXUFBE9XmApavMqhzJU1RjA1OeFW9yqKNlW+wHc3JOJmsGg2mjAB2seMUvT57msnMoIYagdWHiZrWFSj1H1OM3SY9L3Z/9k="
                                                                      , 'id': 1}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)

        #405 테스트
        response = client.delete('/api/fever_progress/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/fever_progress/')
        self.assertEqual(response.status_code, 200)

    def test_fever_exception(self):
        client = Client(enforce_csrf_checks=False)
        #200 테스트
        client.post('/api/user/signin/', json.dumps({'username': 'youngjae', 'password': 'youngjae'}),
                               content_type='application/json')
        response = client.get('/api/fever_exception/')
        self.assertEqual(response.status_code, 200)

        # 201 테스트
        client.post('/api/fever_history/', json.dumps({'category': 'Study', 'etcCategory': ''}),
                               content_type='application/json')
        response = client.get('/api/fever_exception/')
        self.assertEqual(response.status_code, 201)

        # #405 테스트
        response = client.delete('/api/fever_exception/')
        self.assertEqual(response.status_code, 405)
