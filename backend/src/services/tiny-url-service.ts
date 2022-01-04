import { UpdateResult } from 'mongodb';
import { mongoDB } from './mongo-db-service';

interface UrlDbObject {
  shortUrl: string;
  longUrl: string;
  timesUsedCounter: number;
}

export class TinyUrlService {
  private collection = 'TinyURL';

  async findLongUrl(shortUrl: string): Promise<string | undefined> {
    const doc = await mongoDB.findOne<UrlDbObject>(
      this.collection,
      { shortUrl },
      { projection: { longUrl: 1 } },
    );
    return doc?.longUrl;
  }

  async insertLongUrl(longUrl: string): Promise<string> {
    // TODO: Check if exists?! On the MongoDb side?
    if (!this.isUrlValid(longUrl)) {
      throw Error('insertLongUrl failed - Invalid url');
    }

    const shortUrlAlreadyInDb = await this.findShortUrl(longUrl);
    if (shortUrlAlreadyInDb) {
      return shortUrlAlreadyInDb;
    }

    const shortUrl = this.makeRandomShortId();
    const response = await mongoDB.insertOne(this.collection, {
      shortUrl,
      longUrl,
      timesUsedCounter: 0,
      // validUntil: (new Date()) // TODO
    });
    if (!response.acknowledged) {
      throw Error('insertLongUrl failed - Server error');
    }
    return shortUrl;
  }
  // TODO: shortURL/longURL index for faster search?

  isUrlValid(urlToTest: string): boolean {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
      urlToTest,
    );
  }

  async updateTimesUsed(shortUrl: string): Promise<UpdateResult> {
    return await (
      await mongoDB.getCollection(this.collection)
    ).updateOne({ shortUrl }, { $inc: { timesUsedCounter: 1 } });
  }

  async getMostUpdated(limit = 100): Promise<UrlDbObject[]> {
    return await (await mongoDB.find<UrlDbObject>(this.collection, {}))
      .sort({ timesUsedCounter: 1 })
      .limit(limit)
      .toArray();
  }

  private async findShortUrl(longUrl: string): Promise<string | undefined> {
    const doc = await mongoDB.findOne<UrlDbObject>(
      this.collection,
      { longUrl },
      { projection: { shortUrl: 1 } },
    );
    return doc?.shortUrl;
  }

  private makeRandomShortId(length = 7) {
    // TODO!
    // This is a quasi-base 62 encoding. Research this more!?
    // 7 characters should be enough.
    // Write down the back of the envelop calculation!
    const characters =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
