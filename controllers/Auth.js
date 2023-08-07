import Users from "../models/UserModels.js"
import argon2 from "argon2"


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

    req.session.userId = user.uuid
    const uuid = user.uuid
    const name = user.name
    const email = user.email
    return res.status(200).json({uuid,name,email})
  } catch (error) {
    next(error)
  }
}


export const logout = (req, res, next) => {
    req.session.destroy((err) => {
        if(err) {
            next(err)
        }
        return res.status(200).json({message: 'Berhasil Logout'})
    })
}