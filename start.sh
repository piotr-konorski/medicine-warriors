#! /usr/bin/env sh
set -e

# if present, run prestart.sh script
PRE_START_PATH=/prestart.sh
if [ -f $PRE_START_PATH ] ; then
    echo "Running script $PRE_START_PATH"
    . "$PRE_START_PATH"
fi

# Start uvicorn
exec uvicorn app:app --host 0.0.0.0 --port 8080
