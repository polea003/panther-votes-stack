const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const initRoutes = require("./routes/api/PicRoute");
const passport = require('passport')
const cookieSession = require('cookie-session')
connectDB()

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//Middleware
app.use(bodyParser.json())
app.use(cookieSession({
name: 'mysession',
keys: ['vueauthrandomkey'],
maxAge: 24 * 60 * 60 * 1000

}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });


const elections = require('./routes/api/elections')
app.use('/api/elections', elections)

//app.use('/api/goals', require('./routes/api/goalRoutes'))
app.use('/api/users', require('./routes/api/userRoutes'))
app.use('/api/upload', require('./routes/api/PicRoute'))
const Oauth = require('./routes/api/Oauth')
app.use('/api/Oauth', Oauth)



const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))

//Making a Pool
var createError = require('http-errors');
var path = require('path');
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var mongoPool = require('./config/mongoPool');

mongoPool.connectToServer(function (err) {
  //app goes online once this callback occurs
  /*var indexRouter = require('./routes/index');
  var usersRouter = require('./routes/users');
  var companiesRouter = require('./routes/companies');
  var activitiesRouter = require('./routes/activities');
  var registerRouter = require('./routes/register');*/
  var electionsRouter = require('../server/routes/api/elections');
  //var uploadRouter = require('../server/controllers/upload');
  //var userConRouter = require('../server/controllers/userController');
  /*app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/companies', companiesRouter);
  app.use('/activities', activitiesRouter);
  app.use('/register', registerRouter); */
  app.use('/elections', electionsRouter);
  //app.use('/upload', uploadRouter);
  //app.use('/userController', userConRouter);
  // catch 404 and forward to error handler
  console.log('connectToServer() called')
  app.use(function (req, res, next) {
    next(createError(404));
  });
  // error handler
  app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });
  //end of calback
});

module.exports = app;