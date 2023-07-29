#! /usr/bin/env python3

import boto3

client = boto3.client('cognito-idp')

response = client.list_users(
    UserPoolId='us-east-1_uNgHl3Sio',
    AttributesToGet=[
        'email',
    ],
    Limit=10,
)
users = response['Users']
ddb = boto3.client('dynamodb')
for user in users:
    uuid = user['Username']
    email = user['Attributes'][0]['Value']
    ddb.put_item(
        TableName='ChatWave',
        Item={
            'pk': { 'S': uuid },
            'sk': { 'S': "Attributes" },
            'gsiPk': { 'S': email}
        }
    )