import json
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest,JsonResponse
from .models import Comment
from .models import Group

# Create your views here.
def comment_2_dic(cObject):
    return {
        "id" : cObject.id,
        "content" : cObject.content,
        "firstword" : cObject.author.nickname[0],
        "name" : cObject.author.nickname,
        "reg_date" : cObject.createdate.strftime("%Y/%m/%d, %H:%M")
        }


def comment(request, group_id=0):
    try:
        group_instance = Group.objects.get(id=group_id)
    except Group.DoesNotExist:
        return HttpResponse(status=404)
    
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        comment_list = Comment.objects.filter(group=group_id)
        retrun_list = [comment_2_dic(cObject) for cObject in comment_list]
        return JsonResponse(retrun_list,status=200, safe=False)
        
    elif request.method =='POST':
        try:
            body = request.body.decode()
            content = json.loads(body)['content']
        except (KeyError, json.JSONDecodeError):
            return HttpResponseBadRequest()
        
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        created_comment=Comment(author=request.user, group=group_instance, content=content)
        created_comment.save()
        return JsonResponse(comment_2_dic(created_comment), status=201)
    
    elif request.method =='PUT':
        try:
            body = request.body.decode()
            cid = json.loads(body)['id']
            content = json.loads(body)['content']
        except (KeyError, json.JSONDecodeError):
            return HttpResponseBadRequest()

        modified_comment=Comment.objects.get(id=cid)

        if request.user.id != modified_comment.author.id:
            return HttpResponse(status=401)

        modified_comment.content=content
        modified_comment.save()
        
        return JsonResponse(comment_2_dic(modified_comment), status=200)
    else:
        return HttpResponseNotAllowed(['POST','GET','PUT'])     #405    

def delete_comment(request, comment_id=0):

    if request.method == 'DELETE':
        try:
            deleting_comment = Comment.objects.get(id=comment_id)
        except Comment.DoesNotExist:
            return HttpResponse(status=404)
        
        if request.user.id != deleting_comment.author.id:
            return HttpResponse(status=401)
        
        deleting_comment.delete()
        return HttpResponse(status=200)
    else:
        return HttpResponseNotAllowed(['DELETE'])     #405   
