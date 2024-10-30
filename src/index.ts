import app from './app'
import * as dotenv from 'dotenv'
import { createServer, Server } from 'http'
import { connectMongo } from './db/mongoseConnection'
import getTokenTransactions from './contracts/etherscan/getTokenTransactions'

dotenv.config()

connectMongo()

const server: Server = createServer(app)

const PORT = process.env.PORT || 5000
server.listen(PORT)
console.log(`Server running on port ${PORT}`)
getTokenTransactions('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')