#!/usr/bin/env ts-node

import { mongoDB } from '../src/services/mongo-db-service';

async function main() {
  const response = await mongoDB.insertOne('TinyURL', {
    shortUrl: 'asd',
    longUrl: 'https://www.google.com/',
    // validUntil: (new Date())
  });
  console.log(response);
  await mongoDB.close();
  // TODO: Test in a idempotent way
  // 0. remove if exists
  // 1. add
  // 2. find
  // 3. remove
  // 4. try find again (expect failure)

  // TODO: Use tiny-url-service instead of mongo
}

main();
