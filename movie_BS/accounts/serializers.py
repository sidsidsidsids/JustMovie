from rest_framework import serializers
from .models import Accounts
from dj_rest_auth.registration.serializers import RegisterSerializer

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accounts
        fields = ['username', 'email', 'nickname', 'profile_img'] 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accounts
        fields = ['nickname', 'email', 'profile_img'] 
        # exclude = ['username', 'password', 'followings']

class UserNicknameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accounts
        fields = ['id', 'nickname']


class CustomRegisterSerializer(RegisterSerializer):
    nickname = serializers.CharField(required=True, max_length=150)
    # profile_img = serializers.ImageField(use_url=True)

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        # data['profile_img'] = self.validated_data.get('profile_img','')
        return data
# class AccountsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Accounts
#         fields = ['id', 'username', 'nickname', 'profile_img']
#         extra_kwargs = {'password': {'write_only': True}}  # 비밀번호 필드는 쓰기 전용으로 설정하여 응답에 포함되지 않도록 함

#     def create(self, validated_data):
#         # 해시된 비밀번호로 사용자 생성
#         user = Accounts.objects.create_user(
#             username=validated_data['username'],
#             password=validated_data['password'],
#             nickname=validated_data.get('nickname', ''),
#             profile_img=validated_data.get('profile_img', None)
#         )
#         return user

# class SignUpsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Accounts
#         fields = ['username','nickname','profile_img']

#         def get_cleaned_data(self):
#             return {
#                 'username':self.validated_data.get('username',''),
#                 'nickname':self.validated_data.get('nickname',''),
#                 'profile_img':self.validated_data.get('profile_img',''),
#             }

# class CustomRegisterSerializer(RegisterSerializer):
#     nickname = serializers.CharField(required=True, max_length=150)
#     profile_img = serializers.ImageField(required=False)

#     def custom_signup(self, request, user):
#         # 추가적인 회원가입 로직을 작성하거나 필드를 처리할 수 있습니다.
#         nickname = self.validated_data.get('nickname', '')
#         profile_img = self.validated_data.get('profile_img', None)
        
#         # Accounts 모델의 추가적인 필드에 값을 저장할 수 있습니다.
#         user.nickname = nickname
#         user.profile_img = profile_img
#         user.save()