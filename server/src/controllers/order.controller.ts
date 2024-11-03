import { prisma } from '../config/prisma'
import { Request, Response } from 'express'
import { printer1, printer2, printPaper } from '../config/printer'

export const findOrders = async (req: Request, res: Response) => {
    try {
        const where = {}
        const page = Number(req.query?.page) || 1
        const limit = Number(req.query?.limit) || 20
        const ids = req.query.ids

        if(ids && ids.length) Object.assign(where, { id: { in: ids } })

        const [total,result] = await prisma.$transaction([
            prisma.order.count({ where }),
            prisma.order.findMany({ 
                where,
                orderBy: { created_at: 'desc' },
                skip: (page - 1) * limit,
                take: +limit,
                include: {
                    orderItems: {
                        include: {
                            food: {
                                select: {
                                    id: true,
                                    name: true,
                                    price: true,
                                    category: true,
                                }
                            }
                        }
                    }
                }
            }),
        ])

        res.json({result, total})
    } catch (error) {
        console.log(error)
    }
}

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { items, ...data } = req.body
        const result = await prisma.order.create({ data })
        const orderItems = await Promise.all(items.map(async (item: any) => {
            return await prisma.orderItem.create({
                data: {
                    foodId: item.foodId,
                    quantity: item.quantity,
                    orderId: result.id
                },
                include: {
                    food: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                        }
                    }
                }
            })
        }))
        printPaper({ ...result, orderItems }, printer1)
        res.json({ ...result, orderItems })
    } catch (error) {
        console.log(error);
    }
}

export const updateOrder = async (req: Request, res: Response) => {
    try {
        await prisma.order.update({ where: { id: +req.params.id }, data: req.body })
        res.json(true)
    } catch (error) {
        console.log(error)
    }
}