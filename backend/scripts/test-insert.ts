#!/usr/bin/env ts-node

import { collections } from '../model/collections';
import { mongoDB } from '../src/db/mongo-db';

async function main() {
  const response = await mongoDB.insertOne(collections.url, {
    shortUrl: 'asd',
    longUrl: 'https://www.google.com/',
    // validUntil: (new Date())
  });
  console.log(response);
  await mongoDB.close();
}

main();
