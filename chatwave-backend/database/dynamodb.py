import boto3

class DynamoDB():
    
    def __init__(self):
        self.client = boto3.client('dynamodb')
        self.table = self.client.Table('users')

    def get_user(self, username):
        return self.table.get_item(Key={
            'pk': username,
            'sk': 'A'
            })