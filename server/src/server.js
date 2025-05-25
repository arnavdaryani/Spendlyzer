import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { db } from './db/db.js'
import { readdirSync } from 'fs'

const app = express()
const PORT = process.env.PORT || 8080

// Middlewares
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
  })
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.json())

// set up api route

const server = () => {
  db()
  app.listen(PORT, () => {
    console.log('listening to port:', PORT)
  })
}

server()
