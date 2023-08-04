import { EagerLoadingError, json } from "sequelize"
import Users from "../models/UserModels.js"
import argon2 from "argon2"

export const register = async ( req, res) => {
    const {name, email, password, confPassword} = req.body

    if(password !== confPassword) return res.status(400).json({message: 'Password and Confirm Password not Same'})
    const hashPassword = await argon2.hash(password)
    try {
        const emailFind = await Users.findOne({
            where: {
                email: email
            }
        })
        if(emailFind) return res.status(400).json({message: 'Email Already Register'})
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        })
        res.status(201).json({message: 'Register success'})
    } catch (error) {
        console.log(`terjdi kesalahan Error: ${error}`)
        res.status(500).json({message: 'Something Wrong'})
    }
}

export const updaetUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    })

    if(!user) return res.status(404).json({message: 'User Not Found'})
    const {name, email, password, confPassword} = req.body

  
    let hashPassword;
    if(password === '' || password === null || password === undefined || confPassword === undefined){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password)
    }
    if(password !== confPassword) res.status(400).json({message: 'Password and Confirm Password not Same'})
    
    try {
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
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
        console.log(`terjdi kesalahan Error: ${error}`)
        res.status(500).json({message: 'Something Wrong'})
    }
}