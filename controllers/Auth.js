import Users from "../models/UserModels.js"
import argon2 from "argon2"
import jwt from 'jsonwebtoken'
import fs from 'fs/promises'


const accessTokenPath = await fs.readFile(process.env.PATH_PRIVATE_KEY, 'utf-8')
const refreshTokenPath = await fs.readFile(process.env.PATH_PUBLIC_KEY, 'utf-8')

export const login = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    })

    if (!user) {
      return res.status(400).json({ message: 'Login Failed, Email or Password Wrong'})
    }

    const match = await argon2.verify(user.password, req.body.password)

    if (!match) {
      return res.status(400).json({ message: 'Login Failed, Email or Password Wrong'})
    }

    const userId = user.id
    const email = user.email
    const accessToken = jwt.sign({userId, email}, accessTokenPath, {
      expiresIn: '30s',
      algorithm: 'RS256'
    })

    const refreshToken = jwt.sign({userId, email}, accessTokenPath, {
      expiresIn: '1d',
      algorithm: 'RS256'
    })

    await Users.update({
      refreshToken: refreshToken
    }, {
      where: {
        id: userId
      }
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 1000 // 12 jam
    })

    res.status(200).json({token: accessToken})
    
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.status(401).json({message: 'Unauthorized'})
    
    const user = await Users.findOne({
      where: {
        refreshToken: refreshToken
      }
    })

    if(!user) return res.status(400).json({message: 'Unauthorized'})

    const userId = user.id

    await Users.update({
      refreshToken: null
    }, {
      where: {
        id: userId
      }
    })

    res.clearCookie('refreshToken')
    res.status(200).json({message: 'logout success'})
  } catch (error) {
    next(error)
  }
  
}

// refresh token
export const refreshToken = async (req, res, next) => {
  try {

    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.status(401).json({message: 'Unauthorized'}) // if not refresh token in cookies

    const user = await Users.findOne({
      where: {
        refreshToken: refreshToken
      }
    })

    if(!user) return res.status(400).json({message: 'Unauthorized'}) // if not refresh token in db

    jwt.verify(refreshToken, refreshTokenPath, (err, decoded) => {
      if(err) return res.status(401).json({message: 'Unauthorized'}) // if refresh token invalid

      const userId = user.id
      const email = user.email
      const accessToken = jwt.sign({userId, email}, accessTokenPath, {
        expiresIn: '5m',
        algorithm: 'RS256'
      })
      res.status(200).json({token: accessToken})
    })
  } catch (error) {
    next(error)
  }
  
}