import mongoose from 'mongoose'
import config from './config/config.js'
import app from './server/express.js'

mongoose.set('strictQuery', true)

const startServer = async () => {
  try {
    await mongoose.connect(config.mongoUri)
    console.log('Connected to the Portfolio database!')

    app.listen(config.port, () => {
      console.log(`Server started on port ${config.port}.`)
      if (config.env !== 'production') {
        console.log(`Backend: http://localhost:${config.port}`)
      }
    })
  } catch (err) {
    console.error('Unable to connect to MongoDB:', err.message)
    process.exit(1)
  }
}

startServer()
