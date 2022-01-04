const urlCollectionName = 'TinyURL';
db.createCollection(urlCollectionName);

const urlCollection = db.getCollection(urlCollectionName);
// shortUrls and longUrls will be unique now.
urlCollection.createIndex({ longUrl: 1 }, { unique: true });
urlCollection.createIndex({ shortUrl: 1 }, { unique: true });

db.createCollection('last24');
