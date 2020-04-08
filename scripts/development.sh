#!/bin/bash

export NODE_ENV=development

npx ts-node ./node_modules/typeorm/cli.js migration:run

ts-node src/server