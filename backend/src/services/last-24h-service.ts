import { mongoDB } from './mongo-db-service';
import cron from 'node-cron';

export class Last24HService {
  private collection = 'last24';

  constructor() {
    // Every hour remove the pre 24h submissions
    cron.schedule('0 * * * *', () => {
      this.removeAdditionsFrom24hAgoOrEarlier();
    });
    // TODO: Cleanup!?
  }

  async addDomainCall(url: string) {
    const domain = new URL(url).hostname;
    return await (
      await mongoDB.getCollection(this.collection)
    ).insertOne({ domain, timestamp: new Date().valueOf() });
  }

  async getMostUsedDomains() {
    const _24hAgo = new Date().valueOf() - 86400000;
    return await (
      await mongoDB.getCollection(this.collection)
    )
      .aggregate([
        { $match: { timestamp: { $gt: _24hAgo } } },
        {
          $group: {
            _id: '$domain',
            total: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            total: -1,
          },
        },
      ])
      .toArray();
  }

  async removeAdditionsFrom24hAgoOrEarlier() {
    const _24hAgo = new Date().valueOf() - 86400000;
    return await await (
      await mongoDB.getCollection(this.collection)
    ).deleteMany({ timestamp: { $lt: _24hAgo } });
  }
}
