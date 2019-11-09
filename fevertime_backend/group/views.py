import json
from django.http import HttpResponse, HttpResponseNotAllowed, \
                        JsonResponse, HttpResponseForbidden, HttpResponseBadRequest, HttpResponseNotFound
#from user.models import User
from .models import Group
from user.models import User
from operator import itemgetter
from datetime import datetime, timedelta
# Create your views here.
def group(request):
    if request.method == 'GET':
        user_groups= request.user.user_groups.all()
        response_dict=[{'gid':group.id,
                        'groupname':group.group_name,
                        'num':group.group_members.count(),
                        'TopFever': group.group_members.all()[0].nickname
                        } for group in user_groups]
        return JsonResponse(response_dict, safe=False)

    elif request.method == 'POST':
        body=request.body.decode()
        groupName=json.loads(body)['groupname']
        if Group.objects.filter(group_name=groupName).exists():
            return HttpResponseForbidden()      #403
        created_group=Group(group_name=groupName)
        created_group.save()
        created_group.group_members.add(request.user)
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['GET','POST'])

def group_member_op(request, group_id=0):
    try:
        group_instance = Group.objects.get(id=group_id)
    except:
        return HttpResponse(status=404)

    if request.method == 'GET':
        try:
            group_members= group_instance.group_members.all()
        except:
            return HttpResponse(status=404)
        
        response_list=[user_weekly_feverExtraction(user,0) for user in group_members]
        response_list.sort(key=lambda timeinfo: timeinfo["fever_time"], reverse=True)
        for index,dictionary in enumerate(response_list):
            dictionary['rank']=index+1
        return JsonResponse(response_list, safe=False)

    elif request.method == 'POST':
        try:
            body=request.body.decode()
            guest=json.loads(body)['nickname']
        except:
            return HttpResponseBadRequest()

        try:
            guest_user=User.objects.get(nickname=guest)

        except User.DoesNotExist:
            return HttpResponseNotFound()       #404
        
        for group in guest_user.user_groups.all(): #already in the group
            if(group.id == group_id):
                return  HttpResponseForbidden()  #403

        if guest_user == request.user:
            return HttpResponse(status=401)     #401  self invite

        group_instance.group_members.add(guest_user)
        return HttpResponse(status=201)
    
    elif request.method == 'DELETE':
        try:
            group_instance.group_members.get(id=request.user.id)
        except:
            return HttpResponseNotFound()   #404
        
        group_instance.group_members.remove(request.user)
        return HttpResponse(status=201)

    else:
        return HttpResponseNotAllowed(['GET','POST','DELETE'])

def user_weekly_feverExtraction(user, backstep):
    Current_ISO_tuple = (datetime.now()-timedelta(weeks=backstep)).isocalendar()
    total_fever_time = timedelta(microseconds=0)
    for session in user.fever_history_user.all():
        if(session.click_end=="Y"):
            session_ISO_tuple = session.start_time.isocalendar()
            if(session_ISO_tuple == Current_ISO_tuple):
                total_fever_time += session.fever_time
    tsec = total_fever_time.total_seconds()
    hour = int(tsec//(60*60))
    min = int((tsec%3600)//60)
    sec = int((tsec%60))
    return_dict = {
        "rank" : 0,
        "firstword" : user.nickname[0], 
        "name" : user.nickname, 
        "fever_time" : "{:03d}:{:02d}:{:02d}".format(hour,min,sec)
    }
    
    return return_dict
        
        
            
        