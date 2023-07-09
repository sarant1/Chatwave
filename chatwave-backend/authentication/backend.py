import jwt, requests, json, os
from django.conf import settings
from rest_framework.authentication import BaseAuthentication, get_authorization_header
from jwt.algorithms import RSAAlgorithm
# Amazon Cognito might rotate signing keys in your user pool. As a best practice,
# cache public keys in your app, using the kid as a cache key, and 
# refresh the cache periodically. Compare the kid in the tokens that your app receives to your cache.
# If you receive a token with the correct issuer but a different kid, Amazon Cognito might have rotated the signing key. Refresh the cache from your user pool jwks_uri endpoint.
class TokenError(BaseException):
    pass

class JSONWebTokenAuthentication(BaseException):
    def authenticate(self, request):
        token = get_authorization_header(request).split()[1]
        print("TOKEN", token, flush=True)
        return self.validate_token(token)

    def validate_token(self, token):
        unverifeid_header = jwt.get_unverified_header(token)
        if unverifeid_header["alg"] != "RS256":
            raise Exception("Invalid Token")
        public_key = self._get_public_key()[unverifeid_header["kid"]]
        public_key = RSAAlgorithm.from_jwk(public_key)
        if not public_key:
            raise Exception("Invalid Token")    
        try:
            return jwt.decode(
                token, 
                public_key,
                audience=settings.COGNITO_AUDIENCE,
                issuer=self._pool_url(),
                algorithms=["RS256"]
                )
        except (
            jwt.InvalidTokenError,
            jwt.ExpiredSignatureError,
            jwt.DecodeError,
        ) as exc:
            raise TokenError(str(exc))

    def _pool_url(self):
        url = f"https://cognito-idp.{settings.COGNITO_AWS_REGION}.amazonaws.com/{settings.COGNITO_USER_POOL}"
        print("URL", url, flush=True)
        return url

    def _get_public_key(self):
        url = self._pool_url() + "/.well-known/jwks.json"
        response = requests.get(url)
        response.raise_for_status()
        response = response.json()
        return {item["kid"]: json.dumps(item) for item in response["keys"]}

    
        