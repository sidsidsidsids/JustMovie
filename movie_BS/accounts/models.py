from django.db import models
from django.contrib.auth.models import AbstractUser
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
# Create your models here.

class Accounts(AbstractUser):
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    nickname = models.CharField(max_length=255)
    profile_img = ProcessedImageField(
        upload_to='profile_images/', 
        null=True,
        blank=True,
        processors=[ResizeToFill(100,100)],
        options={'quality':70},
        )

    def __str__(self):
        return self.username
    

# class CustomUserManager(BaseUserManager):
#     def create_user(self, username, password=None, **extra_fields):
#         if not username:
#             raise ValueError('The Username field must be set')
        
#         user = self.model(
#             username=username,
#             **extra_fields
#         )
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, username, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
        
#         return self.create_user(username, password, **extra_fields)

# class Accounts(AbstractBaseUser, PermissionsMixin):
#     username = models.CharField(max_length=255, unique=True)
#     nickname = models.CharField(max_length=255)
#     email = models.EmailField(blank=True, null=True)
#     profile_img = ProcessedImageField(
#         upload_to='profile_images/', 
#         null=True,
#         blank=True,
#         processors=[ResizeToFill(100,100)],
#         options={'quality':70},
#         )
    
    
#     objects = CustomUserManager()
    
#     USERNAME_FIELD = 'username'
    
#     class Meta:
#         verbose_name_plural = 'accounts'