import { mongoDB } from './mongo-db-service';

export class TinyUrlService {
  private collection = 'TinyURL';

  async findLongUrl(shortUrl: string): Promise<string | undefined> {
    // TODO: type
    const doc = await mongoDB.findOne<{ longUrl: string }>(
      this.collection,
      { shortUrl },
      { projection: { longUrl: 1 } }
    );
    return doc?.longUrl;
  }

  async insertLongUrl(longUrl: string): Promise<string> {
    // TODO: Check if exists
    if (!this.isUrlValid(longUrl)) {
      throw Error('insertLongUrl failed - Invalid url');
    }
    const shortUrl = this.makeRandomShortId();
    const response = await mongoDB.insertOne(this.collection, {
      shortUrl,
      longUrl,
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
      urlToTest
    );
  }

  private makeRandomShortId(length = 7) {
    // TODO!
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
