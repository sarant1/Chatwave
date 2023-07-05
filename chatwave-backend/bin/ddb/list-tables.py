#! /usr/bin/env python3

import boto3
from pprint import pprint
import sys

purple = "\033[95m"
reset = "\033[0m"

if len(sys.argv) > 1 and sys.argv[1] == "prod":
    print(f"{purple}=====Connecting to prod DynamoDB====={reset}")
    endpoint_url = None
else:
    print(f"{purple}=====Connecting to local DynamoDB====={reset}")
    endpoint_url = "http://localhost:8000"
 
client = boto3.client("dynamodb", region_name="us-east-1", endpoint_url=endpoint_url)

response = client.list_tables(
    Limit=5
)

pprint(response)