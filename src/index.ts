import app from './app'
import * as dotenv from 'dotenv'
import { createServer, Server } from 'http'
import { connectMongo } from './db/mongoseConnection'

dotenv.config()

connectMongo()

const server: Server = createServer(app)

const PORT = process.env.PORT || 5000
server.listen(PORT)
console.log(`Server running on port ${PORT}`)
