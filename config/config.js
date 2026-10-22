import dotenv from 'dotenv'

dotenv.config()

const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Portfolio',
  jwtSecret: process.env.JWT_SECRET || 'development-only-secret-change-me',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
}

if(config.env==='production' && (!process.env.JWT_SECRET || process.env.JWT_SECRET==='replace-with-a-long-random-secret')) throw new Error('Set a strong JWT_SECRET before deploying.')

export default config
