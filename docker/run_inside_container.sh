#!/bin/bash

set -ex

cd /hither-monitor
$(yarn global bin)/serve -s build -l $1
