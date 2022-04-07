/*const mongodb = require('mongodb')

var MongoClient = require('mongodb').MongoClient;
var db;

// Initialize connection once (http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#mongoclient-connect)
MongoClient.connect("mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", function(err, database) {
  if(err) throw err;

  db = database;
  return db
})

module.exports = db*/

/** Standalone file, could not figure out how to link to app */
/*
var express = require('express');
var mongodb = require('mongodb');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var db;

// Initialize connection once
MongoClient.connect("mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
    function(err, database) {
        if(err) throw err;

        db = database;

  // Start the application after the database connection is ready
  app.listen(3000);
  console.log("Listening on port 3000");
});

// Reuse database object in request handlers
app.get("/", function(req, res) {
  db.collection("elections").find({}, function(err, docs) {
    docs.each(function(err, doc) {
      if(doc) {
        console.log(doc);
      }
      else {
        res.end();
      }
    });
  });
});
*/