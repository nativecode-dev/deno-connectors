#!/bin/bash

CWD=$(pwd)

function create_mod() {
  DIR=$(dirname $1)
  NAME=$(basename $1)
  MOD=$DIR/$NAME/mod.ts

  truncate -s 0 ${MOD}

  for TSFILE in ${1}/*/*.ts; do
    FILE=${TSFILE#"$1"}
    echo "export * from '.${FILE}'" >> ${MOD}
  done
}

for MODULE in ${CWD}/*; do
  if [ -d ${MODULE} ]; then
    create_mod ${MODULE}
  fi
done

deno $@ --allow-env --allow-net --allow-read
