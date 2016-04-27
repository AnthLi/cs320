#!/bin/bash

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

rm $dir/inspections.db
node $dir/dbcreate.js
# node $dir/dbsampledata.js
