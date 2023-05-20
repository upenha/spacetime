import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'

import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'

const app = fastify({
  // logger: true,
})

app.register(multipart)

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'spacetime',
})

app.register(uploadRoutes)
app.register(memoriesRoutes)
app.register(authRoutes)

app
  .listen({
    port: 80,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 Server running on http://localhost:3333')
  })
