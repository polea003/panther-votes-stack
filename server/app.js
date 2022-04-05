/** main file that starts the app, whatever that means */
const express = require('express')
const app = express()

const initializeDatabases = require('./dbPool/dbs')
const routes = require('./dbPool/routes')

initializeDatabases().then(dbs => {
  // Initialize the application once database connections are ready.
  //console.log(dbs)
  console.log(routes.toString())
  console.log(initializeDatabases.toString())
  //console.log(dbs.electionDB.collection('elections').find({keys: {$exists: true}}).)
  routes(app, dbs).listen(3000, () => console.log('Listening on port 3000'))
}).catch(err => {
  console.error('Failed to make all database connections!')
  console.error(err)
  process.exit(1)
})
//console.log(initializeDatabases())
//console.log(routes)
/*async function getElections(){
    console.log(this.dbs)
    const client = await this.dbs.db('panther-db').collection('elections')
    return client
}

module.exports = getElections*/