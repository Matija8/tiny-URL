#!/usr/bin/env ts-node

// import chalk from 'chalk';

import { mongoDB } from '../src/services/mongo-db-service';

// TODO: Make a testing strategy
// I.e. based on suffix split tests into
// unit, integration and e2e.
// Use jest

async function isThrowing(cb: () => void): Promise<boolean> {
  try {
    await cb();
  } catch (err) {
    return true;
  }
  return false;
}

async function isNotThrowing(cb: () => void): Promise<boolean> {
  return !(await isThrowing(cb));
}

async function main() {
  const repeatedShortUrl = 'asd';
  const repeatedLongUrl = 'https://www.google.com/';
  const urlCollectionName = 'TinyURL';
  async function clearTestBed() {
    return (await mongoDB.getCollection(urlCollectionName)).deleteMany({
      $or: [{ shortUrl: repeatedShortUrl }, { longUrl: repeatedLongUrl }],
    });
  }
  await clearTestBed();
  try {
    await mongoDB.insertOne(urlCollectionName, {
      shortUrl: repeatedShortUrl,
      longUrl: repeatedLongUrl,
    });
    if (
      await isNotThrowing(async () => {
        await mongoDB.insertOne(urlCollectionName, {
          shortUrl: repeatedShortUrl,
          longUrl: repeatedLongUrl,
        });
      })
    ) {
      throw Error("Both urls repeated dosen't fail, but should!");
    }
    if (
      await isNotThrowing(async () => {
        await mongoDB.insertOne(urlCollectionName, {
          shortUrl: repeatedShortUrl + 'a',
          longUrl: repeatedLongUrl,
        });
      })
    ) {
      throw Error("Long url repeated dosen't fail, but should!");
    }
    if (
      await isNotThrowing(async () => {
        await mongoDB.insertOne(urlCollectionName, {
          shortUrl: repeatedShortUrl,
          longUrl: repeatedLongUrl + 'a',
        });
      })
    ) {
      throw Error("Short url repeated dosen't fail, but should!");
    }
    // console.log(chalk.green('Test success!'));
    console.log('Test success!');
  } catch (err) {
    console.log(err);
    // console.log(chalk.red('Tests failed!!!'));
    console.log('Tests failed!!!');
  } finally {
    const res = await clearTestBed();
    console.log(`Deleted: ${res.deletedCount}`);
    await mongoDB.close();
  }
}

main();
