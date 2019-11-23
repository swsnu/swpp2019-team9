import json
from datetime import datetime, timedelta
from django.http import HttpResponse, HttpResponseNotAllowed, \
                        JsonResponse, HttpResponseForbidden, \
                        HttpResponseBadRequest
from user.models import User
from .models import Group

# Create your views here.
def group(request):
    if request.method == 'GET':
        user_groups = request.user.user_groups.all()
        response_dict = []
        for group_object in user_groups:
            if group_object.group_members.count():
                response_dict.append({'gid':group_object.id,
                                      'groupname':group_object.group_name,
                                      'num':group_object.group_members.count(),
                                      'TopFever': top_fever(group_object),
                                     })
        return JsonResponse(response_dict, safe=False)

    elif request.method == 'POST':
        body = request.body.decode()
        groupName = json.loads(body)['groupname']
        if Group.objects.filter(group_name=groupName).exists():
            return HttpResponseForbidden()      #403
        created_group = Group(group_name=groupName)
        created_group.save()
        created_group.group_members.add(request.user)
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

def group_member_op(request, group_id=0):
    try:
        group_instance = Group.objects.get(id=group_id)
    except Group.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        group_members = group_instance.group_members.all()
        response_list = [user_weekly_feverExtraction(user, 0) for user in group_members]
        response_list.sort(key=lambda timeinfo: timeinfo["fever_time"], reverse=True)
        for index, dictionary in enumerate(response_list):
            dictionary['rank'] = index+1
        return JsonResponse(response_list, safe=False, status=200)

    elif request.method == 'POST':
        try:
            body = request.body.decode()
            guest = json.loads(body)['nickname']
        except (KeyError, json.JSONDecodeError):
            return HttpResponseBadRequest()
        user_list = []
        for name in guest:
            try:
                user_list.append(User.objects.get(nickname=name))
            except User.DoesNotExist:
                continue

        for user in user_list:
            if group_instance not in user.user_groups.all():
                group_instance.group_members.add(user)
        return HttpResponse(status=201)
    elif request.method == 'DELETE':
        group_instance.group_members.remove(request.user)
        if len(group_instance.group_members.all()) == 0:
            group_instance.delete()
        return HttpResponse(status=200)

    else:
        return HttpResponseNotAllowed(['GET', 'POST', 'DELETE'])

def group_add(request,group_id=0):
    try:
        group_instance = Group.objects.get(id=group_id)
    except Group.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        response_list = []
        user_friends = request.user.user_friend1.all()
        for friend in user_friends:
            if group_instance not in friend.friend2.user_groups.all():
                response_list.append({'nickname':friend.friend2.nickname})
        return JsonResponse(response_list, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])

def user_weekly_feverExtraction(user, backstep):
    Current_ISO_tuple = (datetime.now()-timedelta(weeks=backstep)).isocalendar()
    total_fever_time = timedelta(microseconds=0)
    for session in user.fever_history_user.all():
        if session.click_end == "Y":
            session_ISO_tuple = session.end_time.isocalendar()
            if((session_ISO_tuple[0] == Current_ISO_tuple[0]) and
               (session_ISO_tuple[1] == Current_ISO_tuple[1])):
                total_fever_time += session.fever_time
    tsec = total_fever_time.total_seconds()
    hour = int(tsec//(60*60))
    minute = int((tsec%3600)//60)
    sec = int((tsec%60))
    return_dict = {
        "rank" : 0,
        "firstword" : user.nickname[0],
        "name" : user.nickname,
        "fever_time" : "{:03d}:{:02d}:{:02d}".format(hour, minute, sec)
    }
    return return_dict
        
def top_fever(group_object):
    users=group_object.group_members.all()
    user_dict = [user_rawtime(user) for user in users]
    time_list = [user['time'] for user in user_dict]
    top_user_index = time_list.index(max(time_list))
    top_user = user_dict[top_user_index]['nickname']
    return top_user

def user_rawtime(user):
    Current_ISO_tuple = (datetime.now()-timedelta(weeks=0)).isocalendar()
    total_fever_time = timedelta(microseconds=0)
    for session in user.fever_history_user.all():
        if session.click_end == "Y":
            session_ISO_tuple = session.end_time.isocalendar()
            if((session_ISO_tuple[0] == Current_ISO_tuple[0]) and
               (session_ISO_tuple[1] == Current_ISO_tuple[1])):
                total_fever_time += session.fever_time
    tsec = total_fever_time.total_seconds()
    return {'nickname':user.nickname, 'time':tsec}
