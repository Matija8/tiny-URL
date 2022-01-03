#!/usr/bin/env ts-node

import { mongoDB } from '../src/services/mongo-db-service';

async function main() {
  const response = await (await mongoDB.find('Admin', {})).toArray();
  console.log(response);
  await mongoDB.close();
}

main();
