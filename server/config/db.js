const mongoose = require('mongoose')
const options = {maxPoolSize: 100}
const connectDB = async () => {
  try {
<<<<<<< HEAD
    const conn = await mongoose.connect(process.env.MONGO_URI, options)
=======
    const conn = await mongoose.connect(process.env.MONGO_URI, {maxPoolSize: 10})
>>>>>>> Testbranch

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB