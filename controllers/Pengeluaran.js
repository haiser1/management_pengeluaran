
import Pengeluaran from "../models/PengeluaranModels.js"
import { Op, Sequelize } from "sequelize"

// add pengeluaran
export const addPengeluaran = async (req, res, next) => {
    try {
        const {name, price, qty} = req.body

        if(!name || !price || !qty) return res.status(400).json({message: 'Data Connot be Empty'})

        await Pengeluaran.create({
            name: name,
            price: price,
            qty: qty,
            userId: req.userId,
        })
        
        return res.status(201).json({message: 'Data added successfully'})
        
    } catch (error) {
        next(error)
    }
}

// get all data pengeluaran
export const getPengeluaran = async (req, res, next) => {
    try {
        const response = await Pengeluaran.findAll({
            attributes: ['uuid', 'name', 'price', 'qty', 'createdAt', 'updatedAt',
        ],
            where: {
                userId: req.userId
            },
        })
        const total = await Pengeluaran.sum('price')
        return res.status(200).json({
            datas: response,
            total_pengaluaran: total
        })
    } catch (error) {
        next(error)
    }
}

// update data
export const updatePengeluaran = async (req, res, next) => {
    try {
        const {name, price, qty} = req.body
        const data = await Pengeluaran.findOne({
            where: {
                uuid: req.params.id
            }
        })

        if(!data) return res.status(404).json({message: 'Data Not Found'})
    
        await Pengeluaran.update({
            name: name,
            price: price,
            qty: qty
        },{
            where: {
                uuid: req.params.id
            }
        })

        return res.status(200).json({
            message: 'Update Data Successfuly',
            data: req.body
        })
    } catch (error) {
        next(error)
    }
   
}

// delete data
export const deletePengeluaran = async (req, res, next) => {
    try {
        const data = await Pengeluaran.destroy({
            where: {
                uuid: req.params.id
            }
        })

        if(!data) return res.status(404).json({message: 'Data Not Found'})

        return res.status(200).json({message: 'data deleted successfully'})
    } catch (error) {
        next(error)
    }
}

// get pengeluaran per day in params
export const getPengeluaranDayAgo = async (req, res, next) => {
    try {
        const dayAgo = new Date()
        dayAgo.setDate(dayAgo.getDate() - req.params.day)

        const data = await Pengeluaran.findAll({
            attributes: ['uuid', 'name', 'price', 'qty', 'createdAt', 'updatedAt'],
            where: {
                createdAt: {
                    [Op.gte]: dayAgo,
                }
            }
        })

        const total = await Pengeluaran.sum('price')

        return res.status(200).json({
            data: data,
            total_pengaluaran: total
        })
    } catch (error) {
        next(error)
    }
}

// get total pengeluaran / day
export const getSumPengeluaranDayAgo = async (req, res, next) => {
    try {
        const dayAgo = new Date()
        dayAgo.setDate(dayAgo.getDate() - req.params.day)

        const data = await Pengeluaran.sum('price', {
            where: {
                createdAt: {
                    [Op.gte]: dayAgo
                }
            }
        })

        return res.status(200).json({ 
            day: `${req.params.day} hari lalu`,
            total: data
        })

    } catch (error) {
        next(error)
    }
}