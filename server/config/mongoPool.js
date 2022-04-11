/*const MongoClient = require("mongodb").MongoClient
//const urlMongo = "mongodb://localhost:27017"
const urlMongo = "mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/panther-db?retryWrites=true&w=majority"
var db;

function connectToServer( callback ) {
    MongoClient.connect(urlMongo,  { useUnifiedTopology: true , useNewUrlParser: true }, function( err, client ) {
        db  = client.db('panther-db');
        return callback( err );
    })
}

function getDb() {
    return db
}

module.exports = {connectToServer, getDb}*/

var MongoClient = require('mongodb').MongoClient;
var db;
var pantherDB;
var electionsColl;
var keypairsColl;
var usersColl; 
var myFirstDB;
const url = "mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/panther-db?retryWrites=true&w=majority"
module.exports = {
    connectToServer: function (callback) {
        MongoClient.connect(url, function (err, client) {
            db = client;
            pantherDB = client.db('panther-db');
            electionsColl = client.db('panther-db').collection('elections');
            keypairsColl = client.db('panther-db').collection('keypairs');
            usersColl = client.db('panther-db').collection('users');
            myFirstDB = client.db('myFirstDatabase');

            console.log('mognoPool Conected!');
            return callback(err);
        });
    },
    getPanterDB: function () {
        console.log('pantherDB called');
        return pantherDB;
    },
    getDB: function () {
        console.log('getDB called');
        return db;
    },
    getElectionColl: function () {
        console.log('getElectionColl called');
        return electionsColl;
    },
    getKeypairsColl: function () {
        console.log('getKeypairsColl called')
        return keypairsColl;
    },
    getUserColl: function () {
        console.log('getUserColl called')
        return usersColl;
    },
    getMyFirstDB: function () {
        console.log('getMyFirstDB called')
        return myFirstDB;
    },


    
};