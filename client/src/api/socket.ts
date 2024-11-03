import io from 'socket.io-client'
import { baseURL } from '.'

// const socket = io('/')
const socket = io(baseURL)

export const create_food = (data: any) => socket.emit('create-food', data)

export const complete_food = (index: any) => socket.emit('complete-food', index)

export const delete_food = (index: any) => socket.emit('delete-food', index)


export const food_created = (cb: any) => socket.on('food-created', cb)

export const food_completed = (cb: any) => socket.on('food-completed', cb)

export const food_deleted = (cb: any) => socket.on('food-deleted', cb)