import jwt
from datetime import datetime, timedelta, timezone
import requests
from django.utils.translation import gettext as _ # this is for translating error messages to local language
from rest_framework.authentication import BaseAuthentication, get_authorization_header
from rest_framework import exceptions

class JWTAuthenticator(BaseAuthentication):
    def get_token_from_request(self, request):
        auth = get_authorization_header(request).split()

        if not auth or auth[0].lower() != b'bearer':
            return None
        if len(auth) == 1:
            msg = _('Invalid token header. No credentials provided.')
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = _('Invalid token header. Token string should not contain spaces.')
            raise exceptions.AuthenticationFailed(msg)
        
        return auth[1]
# decode_token
# get_user_from_token
# compare_local_kid_to_remote_kid
# get_kid_from_token
# get_public_JWK
# verify_experiation