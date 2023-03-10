#!/usr/bin/env bash

set -euo pipefail

if [ ! -f /dist/secrets ]
then
	echo "Secrets file not mounted!"
	exit 1
fi

source /dist/secrets
/dist/router_wrapper.sh