# move to parent directory
import sys
sys.path.append('..')
#

from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

from database.dynamodb import DynamoDB

red = '\033[91m'
reset = '\033[0m'

dynamodb = DynamoDB()
def index(request):
    return JsonResponse("Hello, world. You're at the polls index.")

@require_http_methods(["POST", "GET"])
def user(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            email = body['email']
            dynamodb.create_user(email)
            response_data = {'message': 'User Created'}
            return JsonResponse(response_data, status=200, content_type='application/json')
        except Exception as e:
            print(red + str(e) + reset, flush=True)
            response_data = {'message': 'Failed to Create User'}
            return JsonResponse(response_data, status=400, content_type='application/json')
        
    elif request.method == 'GET':
        try:
            body = json.loads(request.body)
            email = body['email']
            data = dynamodb.get_user(email)
            return JsonResponse(data, status=200, content_type='application/json')
        except Exception as e:
            print(red + str(e) + reset, flush=True)
            response_data = {'message': 'Failed to Find User'}
            return JsonResponse(response_data, status=400, content_type='application/json')
    else:
        return JsonResponse({'message': 'Invalid Request'}, status=400, content_type='application/json')

@require_http_methods(["POST", "GET"])
def room(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            user1 = body['user1']
            user2 = body['user2']
            dynamodb.create_room(user1, user2)
            response_data = {'message': 'Room Created'}
            return JsonResponse(response_data, status=200, content_type='application/json')
        
        except Exception as e:
            print(red + str(e) + reset, flush=True)
            response_data = {'message': 'Failed to Create Room'}
            return JsonResponse(response_data, status=400, content_type='application/json')
    elif request.method == 'GET':
        try:
            body = json.loads(request.body)
            email = body['email']
            data = dynamodb.get_rooms(email)
            return JsonResponse(data, status=200, content_type='application/json', safe=False)
        except Exception as e:
            print(red + str(e) + reset, flush=True)
            response_data = {'message': 'Failed to Find Rooms'}
            return JsonResponse(response_data, status=400, content_type='application/json')
    else:
        return JsonResponse({'message': 'Invalid Request'}, status=400, content_type='application/json')

@require_http_methods(["POST", "GET"])
def messages(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            email = body['email']
            message = body['message']
            room = body['room']
            data = dynamodb.create_message(room, message, email)
            return JsonResponse(data, status=200, content_type='application/json', safe=False)
        except Exception as e:
            print(red + str(e) + reset, flush=True)
            response_data = {'message': 'Failed to create message'}
            return JsonResponse(response_data, status=400, content_type='application/json')
    elif request.method == "GET":
        try:
            body = json.loads(request.body)
            room = body['room']
            data = dynamodb.get_messages(room)
            return JsonResponse(data, status=200, content_type='application/json', safe=False)
        except Exception as e:
            print(red + str(e) + reset, flush=True)
            response_data = {'message': 'Failed to Find Messages'}
            return JsonResponse(response_data, status=400, content_type='application/json')
    else:
        return JsonResponse({'message': 'Invalid Request'}, status=400, content_type='application/json')

    



