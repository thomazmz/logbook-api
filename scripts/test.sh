#!/bin/bash

export NODE_ENV=test

npx ts-node ./node_modules/typeorm/cli.js --config ./src/infrastructure/typeOrm/config.ts migration:run

npx jest "$1"

npx ts-node ./node_modules/typeorm/cli.js --config ./src/infrastructure/typeOrm/config.ts schema:drop