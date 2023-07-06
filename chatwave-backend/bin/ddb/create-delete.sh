#! /usr/bin/env bash

# Get the absolute path of the current script
SCRIPT_PATH=$(dirname "$(readlink -f "$0")")

echo "The absolute path of this script is: $SCRIPT_PATH"
echo "Purging and creating DynamoDB table..."

python $SCRIPT_PATH/delete-table.py ChatWave
python $SCRIPT_PATH/create-table.py ChatWave