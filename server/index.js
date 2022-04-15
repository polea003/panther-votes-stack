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
var db = require('./Mongo')
connectDB()
 
//db.establishConnection();
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