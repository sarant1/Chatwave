from datetime import datetime

def get_room_time(date_string):
    date_obj = datetime.strptime(date_string, "%Y-%m-%d %H:%M:%S")
    formatted_date_string = datetime.strftime(date_obj, "%I:%M%p")
    return formatted_date_string
