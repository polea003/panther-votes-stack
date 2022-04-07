/** main file that starts the app, whatever that means 
 * Works with dbPool/dbs ans db/routes
 * commented out, can't figure out how to link to app, something with express
*/
/*const express = require('express')
const app = express()

const initializeDatabases = require('./dbPool/dbs') //electionDB
const routes = require('./dbPool/routes') //app

initializeDatabases().then(dbs => {
  // Initialize the application once database connections are ready.
  routes(app, dbs).listen(3000, () => console.log('Listening on port 3000')) 

  console.log(dbs.electionDB)
}).catch(err => {
  console.error('Failed to make all database connections!')
  console.error(err)
  process.exit(1)
})*/


//console.log(dbs)
//console.log(initializeDatabases())
//console.log(routes)
/*async function getElections(){
    console.log(this.dbs)
    const client = await this.dbs.db('panther-db').collection('elections')
    return client
}

module.exports = getElections*/