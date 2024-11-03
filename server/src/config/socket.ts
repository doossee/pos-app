import { Server } from "socket.io"

export default (io: Server) => io.on('connection', socket => {
    socket.on('create-food', (data) => {
        io.emit('food-created', data)
    })
    socket.on('complete-food', (data, index) => {
        io.emit('food-completed', data, index)
    })
    socket.on('delete-food', (data) => {
        io.emit('food-deleted', data)
    })
})