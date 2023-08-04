
import Pengeluaran from "../models/PengeluaranModels.js"
import { Op } from "sequelize"


export const addPengeluaran = async (req,res) => {
    try {
        const {name, price, qty} = req.body
        await Pengeluaran.create({
            name: name,
            price: price,
            qty: qty,
            userId: req.userId,
        })
        
        res.status(201).json({message: 'Data added successfully'})
        
    } catch (error) {
        console.log(`Terjadi Kesalahan Error: ${error}`)
        console.log('user id =', req.userId)
        res.status(500).json({message: 'Something Wrong in Server'})
        
    }
}

export const getPengeluaran = async (req,res) => {
    try {
        const response = await Pengeluaran.findAll({
            attributes: ['uuid', 'name', 'price', 'qty', 'createdAt', 'updatedAt'],
            where: {
                userId: req.userId
            }
        })
        res.status(200).json({datas: response})
    } catch (error) {
        console.log(`Terjadi Kesalahan Error: ${error}`)
        res.status(500).json({message: 'Something Wrong in Server'})
    }
}

export const updatePengeluaran = async (req,res) => {
    try {
        const pengeluaran = await Pengeluaran.findOne({
            where: {
                uuid: req.params.id
            }
        })
        if(!pengeluaran) return res.status(404).json({message: 'Data Not Found'})
        const {name, price, qty} = req.body
    
        await Pengeluaran.update({
            name: name,
            price: price,
            qty: qty
        },{
            where: {
                uuid: req.params.id
            }
        })
        res.status(200).json({
            message: 'Update User Success',
            data: req.body
        })
    } catch (error) {
        console.log(`Terjadi Kesalahan Error: ${error}`)
        res.status(500).json({message: 'Something Wrong in Server'})
    }
   
}

export const getPengeluaranOneWeekAgo = async (req,res) => {
    try {
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

        const data = await Pengeluaran.findAll({
            where: {
                createdAt: {
                    [Op.gte]: oneWeekAgo,
                }
            }
        })

        res.status(200).json(data)
    } catch (error) {
        console.log(`Terjadi Kesalahan Error: ${error}`)
        res.status(500).json({message: 'Something Wrong in Server'})
    }
}