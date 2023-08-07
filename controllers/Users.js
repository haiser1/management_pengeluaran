import Users from "../models/UserModels.js"
import argon2 from "argon2"
import { generateOtp, sendOtp } from "../utils/Otp.js"

// register user can't use email same
export const register = async (req,res,next) => {
    try {
    const {name, email, password, confPassword} = req.body
    const otp = generateOtp()
    
    if(!name || !email || !password || !confPassword) return res.status(400).json({message: 'Data Cannot be Empty'})

    if(password !== confPassword) return res.status(400).json({message: 'Password and Confirm Password not Same'})

    const hashPassword = await argon2.hash(password)
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000)
    const emailFind = await Users.findOne({
        where: {
            email: email
        }
    })

    if(emailFind) return res.status(400).json({message: 'Email Already Register'})

    await Users.create({
        name: name,
        email: email,
        password: hashPassword,
        otpCode: otp,
        otpExpiration: otpExpiration,
    })

    sendOtp(email, otp)
    return res.status(201).json({message: 'Register success, Check OTP Code in Your Email'})

    } catch (error) {
        next(error)
    }
}

// get data me
export const me = async (req, res, next) => {
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email'],
            where: {
                uuid: req.session.userId
            }
        })
    
        if(!user) return res.status(404).json({message: 'User Not Found'})
        return res.status(200).json(user)
        
    } catch (error) {
        next(error)
    }
    
}

// update name
export const updateName = async (req, res, next) => {
    try {
    const {name} = req.body
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    })

    if(!user) return res.status(404).json({message: 'User Not Found'})
    
    await Users.update({
        name: name,
    },{
        where: {
            uuid: req.params.id
        }
    })

    return res.status(200).json({
        message: 'Name Updated successfully',
        data: req.body
    })

    } catch (error) {
        next(error)
    }
}

// change password
export const changePassword = async (req, res, next) => {
    try {
        const {password, newPassword, confPassword} = req.body

        const user = await Users.findOne({
            where: {
                uuid: req.params.id
            }
        })
        if(!user) return res.status(404).json({message: 'User Not Found'})
        
        const match = await argon2.verify(user.password, password)
        
        if(!match) return res.status(400).json({message: 'Password Wrong!'})

        if(!newPassword || !confPassword) return res.status(400).json({message: 'New Password or Confpassword cannot be empty'})
        
        if(newPassword !== confPassword) return res.status(400).json({message: 'Password and Confirm Password not Same'})       
        
        const hashPassword = await argon2.hash(newPassword)
        await Users.update({
            password: hashPassword
        },{
            where: {
                uuid: req.params.id
            }
        })

        return res.status(200).json({message: 'password changed successfully'})

    } catch (error) {
        next(error)
    }
}

// forget password
export const forgetPassword = async (req, res, next) => {
    try {
        const {email} = req.body
        if(!email) return res.status({message: 'Email Cannot be Empty'})
        const otp = generateOtp()
        const otpExpiration = new Date(Date.now() + 5 * 60 * 1000) // 5 menit
        const user = await Users.findOne({
            where: {
                email: email
            }
        })

        if(!user) return res.status(404).json({message: 'Email Not Found'})

        await Users.update({
            otpCode: otp,
            otpExpiration: otpExpiration
        },{
            where: {
                email: email
            }
        })

        sendOtp(email,otp)
        return res.status(200).json({message: 'Check OTP Code in Your Email'})

    } catch (error) {
        next(error)
    }
}

// new password and verify otp
export const newPassword = async(req, res, next) => {
    try {
        const {otp, newPassword, confPassword} = req.body

        if(!otp || !newPassword || !confPassword) return res.status(400).json({message: 'data cannot be empty'})

        if(newPassword !== confPassword) return res.status(400).json({message: 'New Password and Confirm Password not Same'})

        const user = await Users.findOne({
            where: {
                uuid: req.userUuid
            }
        })

        if(!user) return res.status(404).json({message: 'Data Not Found'})
        
        const hashPassword = await argon2.hash(newPassword)

        if(user.otpCode === otp && user.otpExpiration && user.otpExpiration > new Date()){
            await Users.update({
                password: hashPassword
            },{
                where: {
                    uuid: req.userUuid
                }
            })

            return res.status(201).json({message: 'password updated successfully'})
        }

        return res.status(400).json({message: 'Invalid OTP code or OTP code has expired, please re-request your OTP code'})

    } catch (error) {
        next(error)
    }
}