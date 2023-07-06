

from formatters.date_time import get_room_time

def format_rooms(data):
    print("DATA: ", data, flush=True)
    data = data['Items']
    formatted_data = []
    for room in data:
        print("ROOM: ", room, flush=True)
        room_data = {}
        room_data['user'] = room['pk']['S'][5:]
        room_data['key'] = room['sk']['S'][5:]
        room_data['title'] = room['title']['S']
        room_data['latest_message'] = room['latest_message']['S']
        room_data["avatar_url"] = room["avatar_url"]["S"]
        room_data["latest_message_time"] = get_room_time(room['latest_message_time']['S'])
        formatted_data.append(room_data)
    return formatted_data

def format_messages(data):
    data = data['Items']
    formatted_data = []
    for message in data:
        message_data = {}
        message_data['message'] = message['message']['S']
        message_data['sender_id'] = message['sender_id']['S']
        message_data['created_at'] = message['created_at']['S']
        message_data['key'] = message['key']['S']
        formatted_data.append(message_data)
    return formatted_data

