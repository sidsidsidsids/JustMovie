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
