

def format_rooms(data):
    print("DATA: ", data, flush=True)
    data = data['Items']
    formatted_data = []
    for room in data:
        print("ROOM: ", room, flush=True)
        room_data = {}
        room_data['pk'] = room['pk']['S'][5:]
        room_data['sk'] = room['sk']['S'][5:]
        room_data['title'] = room['title']['S']
        room_data['latest_message'] = room['latest_message']['S']
        formatted_data.append(room_data)
    return formatted_data

