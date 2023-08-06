# !/bin/bash

set -e

# Get path to root frontend
ROOTPATH=$(dirname $(dirname $(readlink -f $0)))
BINPATH=$ROOTPATH/bin

source $BINPATH/static-build.sh
source $BINPATH/sync-s3.sh