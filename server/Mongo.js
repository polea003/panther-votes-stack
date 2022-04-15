
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var connection=[];
// Create the database connection
establishConnection = function(callback){

                MongoClient.connect(process.env.MONGO_URI, { MaxpoolSize: 10 },function(err, db) {
                    assert.equal(null, err);
                        connection = db

                        if(typeof callback === 'function' && callback())
                            callback(connection)

                    }

                )



}


function getconnection(){
    return connection
}

module.exports = {

    establishConnection:establishConnection,
    getconnection:getconnection
}