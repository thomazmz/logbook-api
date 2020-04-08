#!/bin/bash

export NODE_ENV=test

npx ts-node ./node_modules/typeorm/cli.js migration:run

npx jest "$1"

npx ts-node ./node_modules/typeorm/cli.js schema:drop