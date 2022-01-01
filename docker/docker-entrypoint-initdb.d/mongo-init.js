const adminCollectionName = 'Admin';
db.createCollection(adminCollectionName);

const adminCollection = db.getCollection(adminCollectionName);
adminCollection.insert({
  username: 'admin',
  pass: 'admin', // TODO: hash + salt
});

const urlCollection = db.createCollection('TinyURL');
