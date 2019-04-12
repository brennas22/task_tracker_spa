#!/bin/bash

export MIX_ENV=prod
export PORT=4794

echo "Stopping old version."

_build/prod/rel/task_tracker_spa/bin/task_tracker_spa stop || true

echo "Starting Task Tracker."

_build/prod/rel/task_tracker_spa/bin/task_tracker_spa foreground
