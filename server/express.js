import express from 'express'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'
import { fileURLToPath } from 'url'
import config from '../config/config.js'
import contactRoutes from './routes/contact.routes.js'
import projectRoutes from './routes/project.routes.js'
import qualificationRoutes from './routes/qualification.routes.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express()

app.use(helmet({ contentSecurityPolicy: false }))
app.use(compression())
app.use(cookieParser())
app.use(express.json({limit:'32kb'}))
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: config.env === 'production' ? config.clientOrigin : true,
  credentials: true,
}))

app.use(contactRoutes)
app.use(projectRoutes)
app.use(qualificationRoutes)
app.use(userRoutes)
app.use(authRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'COMP229 Assignment 3 API is running' })
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clientDist = path.resolve(__dirname, '../client/dist')

if (config.env === 'production') {
  app.use(express.static(clientDist))
  app.get('*', (_req, res) => res.sendFile(path.join(clientDist, 'index.html')))
} else {
  app.get('/', (_req, res) => {
    res.json({ message: 'Welcome to My Portfolio application.' })
  })
}

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

export default app

