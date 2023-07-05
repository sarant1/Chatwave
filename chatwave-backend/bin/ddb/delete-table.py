#! /usr/bin/env python3

import boto3
import sys
from pprint import pprint
#  EXAMPLES:
# ./bin/ddb/delete-table.py <table-name> prod
# ./bin/ddb/delete-table.py <table-name>

red = "\033[7m"
purple = "\033[95m"
reset = "\033[0m"

if len(sys.argv) < 2:
    print(f"{red}ERROR: Please provide a table name{reset}")
    sys.exit(1)
if len(sys.argv) > 2 and sys.argv[2] == "prod":
    print(f"{purple}=====Connecting to prod DynamoDB====={reset}")
    endpoint_url = None
else:
    print(f"{purple}=====Connecting to local DynamoDB====={reset}")
    endpoint_url = "http://localhost:8000"

client = boto3.client("dynamodb", region_name="us-east-1", endpoint_url=endpoint_url)

response = client.delete_table(
    TableName=sys.argv[1]
)

pprint(response)