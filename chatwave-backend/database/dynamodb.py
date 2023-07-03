import boto3

red = '\033[91m'
reset = '\033[0m'

class DynamoDB():

    def __init__(self):
        self.client = boto3.client('dynamodb', region_name='us-east-1')

    def get_user(self, username):
        return self.client.get_item(Key={
            'pk': {'S': f'USER#{username}' },
            'sk': {'S': 'A'},
            },
            TableName='ChatWave'
            )
    
    def create_user(self, username):
        return self.client.put_item(Item={
        'pk': {'S': f'USER#{username}' },
        'sk': {'S': 'A'},
        'email': {'S': username },
        },
        ConditionExpression='attribute_not_exists(pk)',
        ReturnValues='NONE',
        TableName='ChatWave'
        )
  
        
        
    