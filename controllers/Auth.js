import Users from "../models/UserModels.js"
import argon2 from "argon2"


export const login = async (req, res) => {
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

    req.session.userId = user.uuid
    const uuid = user.uuid
    const name = user.name
    const email = user.email
    res.status(200).json({uuid,name,email})
  } catch (error) {
    console.log(`Terjadi kesalahan Error: ${error}`)
    res.status(500).json({ message: 'Something went wrong' })
  }
}


export const me = async (req,res) => {
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email'],
            where: {
                uuid: req.session.userId
            }
        })
    
        if(!user) return res.status(404).json({message: 'User Not Found'})
        res.status(200).json(user)
        
    } catch (error) {
        console.log(`terjdi kesalahan Error: ${error}`)
        res.status(500).json({message: 'Something Wrong'})
    }
    
}

export const logout = (req,res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(`terjdi kesalahan Error: ${err}`)
            return res.status(500).json({message : 'Something Wrong'})
        }
        res.status(200).json({message: 'Berhasil Logout'})
    })
}