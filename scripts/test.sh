#!/bin/bash

export NODE_ENV=test

npx ts-node ./node_modules/typeorm/cli.js --config ./src/infrastructure/typeOrm/config.ts migration:run

if [ $# -eq 0 ]
then
  npx jest --coverage
else
  npx jest $@
fi

npx ts-node ./node_modules/typeorm/cli.js --config ./src/infrastructure/typeOrm/config.ts schema:drop