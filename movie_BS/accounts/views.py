# from django.contrib.auth import get_user_model
# from django.http import JsonResponse
# from .models import Accounts

# def user_info(request):
#     user = Accounts.objects.get(username=request.user.username)
#     data = {
#         'username': user.username,
#         'nickname': user.nickname,
#         # 기타 원하는 사용자 필드 추가
#     }
#     return JsonResponse(data)
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from .models import Accounts
from .serializers import UserListSerializer, UserSerializer, UserNicknameSerializer
from django.shortcuts import get_object_or_404, get_list_or_404

@api_view(['GET'])
def user_list(request):
    users = Accounts.objects.all()
    serialized_users = UserListSerializer(users, many=True)
    return Response(serialized_users.data)

@api_view(['GET', 'PATCH'])
# @renderer_classes([JSONRenderer])
def user_detail(request, id):
    user = get_object_or_404(Accounts, id=id)
    if request.method == 'GET':
        serialized_user = UserSerializer(user)
        return Response(serialized_user.data)
    elif request.method == 'PATCH':
        serialized_user = UserSerializer(user, data=request.data)
        if serialized_user.is_valid(raise_exception=True):
            serialized_user.save()
            return Response(serialized_user.data)
        
@api_view(['GET'])
def user_nickname(request):
    users = get_list_or_404(Accounts)
    serialized_users = UserNicknameSerializer(users, many=True)
    return Response(serialized_users.data)