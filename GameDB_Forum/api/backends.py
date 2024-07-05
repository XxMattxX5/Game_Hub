from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import User

class CaseInsensitiveModelBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        # Convert username to lowercase (or uppercase) before attempting authentication
        if username is None:
            username = kwargs.get(User.USERNAME_FIELD)
        try:
            # Case-insensitive username lookup
            user = User.objects.get(**{f'{User.USERNAME_FIELD}__iexact': username})
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            return None
