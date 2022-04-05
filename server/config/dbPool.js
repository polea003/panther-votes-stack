const mongodb = require('mongodb')

var MongoClient = require('mongodb').MongoClient;
var db;

// Initialize connection once (http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#mongoclient-connect)
MongoClient.connect("mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", function(err, database) {
  if(err) throw err;

  db = database;
  return db
})

module.exports = db