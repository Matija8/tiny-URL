import {
  Document,
  Filter,
  FindCursor,
  FindOptions,
  MongoClient,
  MongoClientOptions,
  MongoError,
} from 'mongodb';

const gDBName = 'production';

class MongoDB {
  private client = MongoDB.createMongoClient();

  public async find<T>(
    collectionName: string,
    query: Filter<Document>,
    options?: FindOptions
  ) {
    const collection = await this.getMongoCollection(collectionName);
    return collection.find(query, options) as FindCursor<T>;
  }

  public async findOne<T>(
    collectionName: string,
    query: Filter<Document>,
    options?: FindOptions
  ) {
    const collection = await this.getMongoCollection(collectionName);
    return collection.findOne(query, options) as Promise<T | null>;
  }

  public async getMongoCollection(collectionName: string) {
    return (await this.client).db(gDBName).collection(collectionName);
  }

  public async close() {
    return (await this.client).close();
  }

  private static async createMongoClient() {
    const url = getMongoServerConnectionString()[gDBName];
    const options: MongoClientOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as MongoClientOptions; // TODO
    try {
      const mongoClient = await MongoClient.connect(url, options);
      return mongoClient;
    } catch (err) {
      if (err instanceof MongoError) {
        console.debug('\n\nDid you forget to turn on your VPN?\n');
      }
      throw err;
    }
  }
}

function getMongoServerConnectionString(): { [key: string]: string } {
  return { todo: 'TODO' };
}

export const mongoDB = new MongoDB();
