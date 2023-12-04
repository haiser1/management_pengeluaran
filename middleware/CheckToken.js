import jwt from 'jsonwebtoken'
import fs from 'fs/promises'
import { configDotenv } from 'dotenv'
configDotenv()

const refreshTokenPath = await fs.readFile(process.env.PATH_PUBLIC_KEY, 'utf-8')
export const checkToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) res.status(401).json({message: 'Unauthorized'})

    jwt.verify(token, refreshTokenPath, (err, decoded) => {
        if(err) return res.status(401).json({message: 'Unauthorized'})

        req.userId = decoded.userId
        req.email = decoded.email

        next()
    })
}



