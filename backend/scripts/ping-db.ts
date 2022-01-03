#!/usr/bin/env ts-node

import { collections } from '../model/collections';
import { mongoDB } from '../src/db/mongo-db';

async function main() {
  const response = await (await mongoDB.find(collections.admin, {})).toArray();
  console.log(response);
  await mongoDB.close();
}

main();
