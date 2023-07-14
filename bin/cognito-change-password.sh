#! /bin/bash

if [ $# -ne 3 ]; then
  echo "Usage: $0 <user-pool-id> <username> <password>"
  exit 1
fi

aws cognito-idp admin-set-user-password \
  --user-pool-id $1 \
  --username $2 \ 
  --password $3 \
  --permanent