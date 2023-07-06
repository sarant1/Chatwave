import boto3
from uuid import uuid4
from datetime import datetime
import os

red = '\033[91m'
reset = '\033[0m'
endpoint_url = None

if os.environ.get('DDB_ENDPOINT'):
    endpoint_url = os.environ.get('DDB_ENDPOINT')
else:
    endpoint_url = None

class DynamoDB():
    def __init__(self):
        self.client = boto3.client('dynamodb', region_name='us-east-1', endpoint_url=endpoint_url)
        self.table = 'ChatWave'

    def get_user(self, username):
        return self.client.get_item(Key={
            'pk': {'S': f'USER#{username}' },
            'sk': {'S': 'A'},
            },
            TableName=self.table
            )
    
    def create_user(self, username):
        return self.client.put_item(Item={
        'pk': {'S': f'USER#{username}' },
        'sk': {'S': 'A'},
        'email': {'S': username },
        },
        ConditionExpression='attribute_not_exists(pk)',
        ReturnValues='NONE',
        TableName=self.table
        )
    
    def create_room(self, user1, user2, message):
        uuid = uuid4()
        self.create_message(uuid, message, user1)
        return self.client.batch_write_item(
            RequestItems={
                self.table: [
                    {
                        'PutRequest': {
                            'Item': {
                                'pk': {'S': f'USER#{user1}' },
                                'sk': {'S': f'ROOM#{uuid}'},
                                'title': {'S': user2},
                                'latest_message': {'S': message},
                                'latest_message_time': {'S': datetime.now().strftime('%Y-%m-%d %H:%M:%S')},
                                'avatar_url': {'S': 'https://i.imgur.com/2WZtUZB.png'}
                            }
                        },
                    },
                    {
                        'PutRequest': {
                            'Item': {
                                'pk': {'S': f'USER#{user2}' },
                                'sk': {'S': f'ROOM#{uuid}'},
                                'title': { 'S': user1 },
                                'latest_message': {'S': message},
                                'latest_message_time': {'S': datetime.now().strftime('%Y-%m-%d %H:%M:%S')},
                                'avatar_url': {'S': 'https://i.imgur.com/2WZtUZB.png'}
                            }
                        },
                    },
                    {
                        'PutRequest': {
                            'Item': {
                                'pk': {'S': f'ROOM#{uuid}' },
                                'sk': {'S': f'A'},
                                'isGroup': {'BOOL': False},
                            }
                        }
                    }
                ]
            },
            ReturnConsumedCapacity='NONE',
            ReturnItemCollectionMetrics='NONE',
        )
    
    def get_rooms(self, username):
        return self.client.query(
            TableName=self.table,
            KeyConditionExpression='pk = :pk AND begins_with(sk, :sk)',
            ExpressionAttributeValues={
                ':pk': {'S': f'USER#{username}'},
                ':sk': {'S': 'ROOM#'}
            }
        )
    
    def create_message(self, room, message, email):
        now = datetime.now()
        uuid = uuid4()
        formatted_date = now.strftime('%Y-%m-%d %H:%M:%S')
        return self.client.put_item(Item={
            'pk': {'S': f'ROOM#{room}' },
            'sk': {'S': f'MSG#{formatted_date}'},
            'message': {'S': message },
            'sender_id': {'S': email},
            'created_at': {'S': now.strftime('%Y-%m-%d %H:%M:%S')},
            'key': {'S': str(uuid)}
            },
            ReturnValues='NONE',
            TableName=self.table
            )

    def get_messages(self, room):
        return self.client.query(
            TableName=self.table,
            KeyConditionExpression='pk = :pk AND begins_with(sk, :sk)',
            ExpressionAttributeValues={
                ':pk': {'S': f'ROOM#{room}'},
                ':sk': {'S': 'MSG#'}
            }
        )
  
        
        
    