#! /bin/bash

set -e

USERPOOL_ID='us-east-1_9Zehkm7F5'

aws cognito-idp admin-create-user \
    --user-pool-id $USERPOOL_ID \
    --username "guest@chatwave.com" \
    --temporary-password "Testing123!" \

aws cognito-idp admin-set-user-password \
  --user-pool-id $USERPOOL_ID \
  --username "guest@chatwave.com" \
  --password "Testing123!" \
  --permanent

