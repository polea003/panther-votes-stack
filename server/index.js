const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

connectDB()

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//Middleware
app.use(bodyParser.json())
app.use(cors())

const elections = require('./routes/api/elections')
app.use('/api/elections', elections)

app.use('/api/goals', require('./routes/api/goalRoutes'))
app.use('/api/users', require('./routes/api/userRoutes'))

const Oauth = require('./routes/api/Oauth')
app.use('/api/Oauth', Oauth)



const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))