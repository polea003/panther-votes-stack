const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

//Middleware
app.use(bodyParser.json())
app.use(cors())

const elections = require('./routes/api/elections')
app.use('/api/elections', elections)

app.use('/api/goals', require('./routes/api/goalRoutes'))
app.use('/api/users', require('./routes/api/userRoutes'))


const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))