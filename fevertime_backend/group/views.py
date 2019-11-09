import json
from django.http import HttpResponse, HttpResponseNotAllowed, \
                        JsonResponse, HttpResponseForbidden
#from user.models import User
from .models import Group
from operator import attrgetter
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
    if request.method == 'GET':
        try:
            group_members= Group.objects.get(id=group_id).group_members.all()
        except:
            return HttpResponse(status=404)
        
        response_list=[user_weekly_feverExtraction(user,0) for user in group_members]
        response_list.sort(key=attrgetter("fever_time"), reverse=True)

        for index,dictionary in enumerate(response_list):
            dictionary['rank']=index+1
        return JsonResponse(response_list, safe=False)

    elif request.method == 'POST':
        
        return HttpResponse(status=201)
    
    elif request.method == 'DELETE':
       
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
    
    return_dict = {
        "rank" : 0,
        "firstword" : user.nickname[0], 
        "name" : user.nickname, 
        "fever_time" : (datetime(0,0,0)+total_fever_time).strftime("%d:%H:%M")
    }
    
    return return_dict
        
        
            
        