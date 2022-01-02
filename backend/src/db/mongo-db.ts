import {
  Document,
  Filter,
  FindCursor,
  FindOptions,
  MongoClient,
  MongoClientOptions,
  MongoError,
} from 'mongodb';

class MongoDB {
  private client: Promise<MongoClient>;

  constructor(connectionUri: string, private dbName: string) {
    this.client = MongoDB.createMongoClient(connectionUri);
  }

  public async find<T>(
    collectionName: string,
    query: Filter<Document>,
    options?: FindOptions
  ) {
    const collection = await this.getMongoCollection(collectionName);
    return collection.find(query, options) as any as FindCursor<T>; // TODO
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
    return (await this.client).db(this.dbName).collection(collectionName);
  }

  public async close() {
    return (await this.client).close();
  }

  private static async createMongoClient(
    connectionUri: string
  ): Promise<MongoClient> {
    const options: MongoClientOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as MongoClientOptions; // TODO
    try {
      const mongoClient = await MongoClient.connect(connectionUri, options);
      console.debug('Mongo client connected');
      return mongoClient;
    } catch (err) {
      if (err instanceof MongoError) {
        console.error('\n\nFailed to connect to mongo client\n');
      }
      throw err;
    }
  }
}

function getMongoServerConnectionString(): string {
  // TODO: Don't hardcode username & password
  // Get from env
  // Also you won't use localhost later on.
  return 'mongodb://root:example@localhost:27017/';
}

export const mongoDB = new MongoDB(
  getMongoServerConnectionString(),
  'tiny-url-db'
);
