const mongoose = require('mongoose')
const options = {maxPoolSize: 100}
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, options)

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB