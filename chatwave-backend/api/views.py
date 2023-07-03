from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
import json


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

@require_http_methods(["POST"])
def chat(request):
    data = {'message': 'Hello, world!'}
    json_data = json.dumps(data)
    print(request.body)
    return HttpResponse(json_data, status=200, content_type='application/json')