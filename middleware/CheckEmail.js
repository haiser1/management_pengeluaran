import Users from "../models/UserModels.js"

// check email verified
export const checkEmail = async (req, res, next) => {
    const user = await Users.findOne({
        where: {
            email: req.body.email
        }
    })
    if(user && user.emailVerified !== true) return res.status(400).json({message: 'Your email has not been verified, please verify your email'})
    next()
}