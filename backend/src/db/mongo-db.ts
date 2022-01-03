import {
  Collection,
  Document,
  Filter,
  FindCursor,
  FindOptions,
  InsertOneResult,
  MongoClient,
  MongoClientOptions,
  MongoError,
  ObjectId,
} from 'mongodb';

class MongoDB {
  private client: Promise<MongoClient>;

  constructor(connectionUri: string, private defaultDbName: string) {
    this.client = MongoDB.createMongoClient(connectionUri);
  }

  public async find<T>(
    collectionName: string,
    query: Filter<Document>,
    options?: FindOptions
  ): Promise<FindCursor<T>> {
    const collection = await this.getCollection(collectionName);
    return collection.find<T>(query, options);
  }

  public async findOne<T>(
    collectionName: string,
    query: Filter<Document>,
    options?: FindOptions
  ): Promise<T | null> {
    const collection = await this.getCollection(collectionName);
    return collection.findOne<T>(query, options);
  }

  public async insertOne(
    collectionName: string,
    doc: Document & { _id?: ObjectId | undefined }
  ): Promise<InsertOneResult<Document>> {
    const collection = await this.getCollection(collectionName);
    return collection.insertOne(doc);
  }

  public async getCollection(
    collectionName: string
  ): Promise<Collection<Document>> {
    return (await this.client)
      .db(this.defaultDbName)
      .collection(collectionName);
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
