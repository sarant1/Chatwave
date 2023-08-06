#! /bin/bash

set -e

# Get path to root frontend
ROOTPATH=$(dirname $(dirname $(readlink -f "$0")))
BINPATH=$ROOTPATH/bin

$BINPATH/static-build.sh
$BINPATH/sync-s3.sh