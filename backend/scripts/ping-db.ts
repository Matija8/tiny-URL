#!/usr/bin/env ts-node

import { mongoDB } from '../src/db/mongo-db';

async function main() {
  const response = await (await mongoDB.getMongoCollection('Admin'))
    .find()
    .toArray();
  console.log(response);
  await mongoDB.close();
}

main();
