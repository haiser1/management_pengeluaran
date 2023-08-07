import Users from "../models/UserModels.js"

export const checkSession = async (req, res, next) => {
    if (!req.session.userId) return res.status(401).json({ message: 'Silahkan Login ke Akun Anda' })

    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    })

    if (!user) return res.status(401).json({ message: 'Silahkan Login ke Akun Anda' })
    
    req.userId = user.id
    req.userUuid = user.uuid
    next()
}


