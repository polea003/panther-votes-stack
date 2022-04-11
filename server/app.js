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

/*
var MongoClient = require('mongodb').MongoClient;
var ourDB;
const url = "mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/panther-db?retryWrites=true&w=majority"
const options = {maxPoolSize: 100 }

// Initialize connection once 
MongoClient.connect(url, options, function(err, database){
  if(err) throw err;

  ourDB = database;
  
  console.log('Connected!...maybe app.js pool')
})

function getDB(){
  return ourDB
}

module.exports = {getDB}
*/
/*
const express = require('express')
const app = express()

const mongo = require('./config/mongoPool');

mongo.connectToServer( function( err) {
  if (err) console.log(err);
  /*const auth = require('./modulos')

  app.post('/login', (req, res) => { auth.login(req, res)})
  app.listen(3000, function () { console.log('Corriendo en puerto 3000')})

});
*/

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var mongoPool = require( './config/mongoPool' );
mongoPool.connectToServer( function( err ) {
  //app goes online once this callback occurs
  /*var indexRouter = require('./routes/index');
  var usersRouter = require('./routes/users');
  var companiesRouter = require('./routes/companies');
  var activitiesRouter = require('./routes/activities');
  var registerRouter = require('./routes/register');*/  
  var electionsRouter = require('../server/routes/api/elections'); 

  /*app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/companies', companiesRouter);
  app.use('/activities', activitiesRouter);
  app.use('/register', registerRouter); */ 
  app.use('/elections', electionsRouter);  
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });
  // error handler
  app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });
  //end of calback
});

module.exports = app;