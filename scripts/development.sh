#!/bin/bash

export NODE_ENV=development

npx ts-node ./node_modules/typeorm/cli.js --config ./src/infrastructure/typeOrm/config.ts migration:run

ts-node src/server