#! /bin/bash


GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Exit on error
set -e

# Get path to root frontend
ROOTPATH=$(dirname $(dirname $(readlink -f "$0")))
FRONTEND_PATH=$ROOTPATH/chatwave-frontend

# Build frontend
cd $FRONTEND_PATH
echo -e "${GREEN}Building frontend${NC}"
sudo npm run build