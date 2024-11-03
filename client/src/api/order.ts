import api from '.'
import { Order, OrderItem } from '@/types'

interface OrderResult {
    total: number
    result: (Order & {order_items: OrderItem[]})[]
}

export const getOrders = (params?: any) => api.get<OrderResult>('/api/order', { params })

export const getCounts = () => api.get('/api/order/count')

export const createOrder = (body: any) => api.post<Order>('/api/order', body)

export const updateOrder = (id: number, body: any) => api.put<Order>(`/api/order/${id}`, body)

export const completeOrder = (id: number,) => api.put<Order>(`/api/order/complete/${id}`)