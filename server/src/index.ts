import path from 'path'
import cors from 'cors'
import routes from './routes'
import express from 'express'
import { createServer } from 'http'
import socket from './config/socket'
import { Server } from 'socket.io'
import { PORT, HOST } from './config/keys'

const app = express()
const server = createServer(app)
const io = new Server(server, { cors: {origin:"*", credentials: true} })

socket(io)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../upload')))
app.use(express.static(path.join(__dirname, '../../client/dist')))

app.use('/api', routes)
app.get('*', async (_, res) => res.sendFile(path.join(__dirname, '../client/dist/index.html')))

server.listen(PORT, HOST as any, () => console.log('server started...'))