/** database connection logic */
const MongoClient = require('mongodb').MongoClient

// Note: A production application should not expose database credentials in plain text.
// For strategies on handling credentials, visit 12factor: https://12factor.net/config.
const ELEC_URI = "mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/panther-db?retryWrites=true&w=majority"
/*const KEY_URI = "mongodb+srv://panther123:<password>@panther-db.gfe61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"*/

function connect(url) {
  return MongoClient.connect(url).then(client => client.db())
}
/*
module.exports = async function () {
  let databases = await Promise.all([connect(ELEC_URI), connect(KEY_URI)])

  return {
    electionDB: databases[0],
    keyDB: databases[1]
  }
}
*/
module.exports = async function () {
  let database = await connect(ELEC_URI)

  return {
    electionDB: database,
  }
}