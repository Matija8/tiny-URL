const urlCollectionName = 'TinyURL';
db.createCollection(urlCollectionName);

const urlCollection = db.getCollection(urlCollectionName);
// longUrls will be unique now.
urlCollection.createIndex({ longUrl: 1 }, { unique: true });
