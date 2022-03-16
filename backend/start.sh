#! /usr/bin/env sh
set -e

# if present, run prestart.sh script
PRE_START_PATH=./prestart.sh
if [ -f $PRE_START_PATH ] ; then
    echo "Running script $PRE_START_PATH"
    . "$PRE_START_PATH"
fi

# Start node server
exec node src/server.js
