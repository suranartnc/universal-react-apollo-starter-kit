#!/bin/bash
parent_path=$( cd "$(dirname "${BASH_SOURCE}")" ; pwd -P )

cd "$parent_path"
rm -rf ./db
docker cp urrsk_mongo:/data/db .
