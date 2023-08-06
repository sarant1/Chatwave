#! /bin/bash

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Sync out directory to s3 static website bucket

# Exit on error
set -e

export CLOUDFRONT_DISTRIBUTION_ID='E3CU8F9ZYS1D2'
export S3_WEBSITE_URL='sudosam.com'

echo "argument: $0"
echo "readlink: $(readlink -f $0)"

# Get path to build file
ROOTPATH=$(dirname $(dirname $(readlink -f "$0")))
OUTPATH=$ROOTPATH/chatwave-frontend/out

# Sync out directory to s3 static website bucket
echo -e "${GREEN}Syncing $OUTPATH to s3://$S3_WEBSITE_URL${NC}"
aws s3 sync $OUTPATH s3://$S3_WEBSITE_URL --delete

echo -e "${YELLOW}Invalidating CloudFront cache${NC}"
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"