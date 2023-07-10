from functools import wraps
from authentication.backend import JSONWebTokenAuthentication
from rest_framework.response import Response
def jwt_auth_required(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        auth = JSONWebTokenAuthentication()
        email = auth.authenticate(request)
        if email:
            return func(request,email=email,*args, **kwargs)
        else:
            return Response({'message': 'Unauthorized'}, status=401, content_type='application/json')
    return wrapper