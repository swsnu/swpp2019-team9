import json
from django.http import HttpResponse, HttpResponseNotAllowed, \
                        JsonResponse, HttpResponseForbidden
#from user.models import User
from .models import Group
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
