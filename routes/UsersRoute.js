import express from "express"
import {
    register,
    updateName,
    changePassword,
    forgetPassword,
    newPassword,
    me,
} from "../controllers/Users.js"
import { checkToken } from "../middleware/CheckToken.js"
const router = express.Router()

router.post('/users/register', register)
router.get('/users', checkToken, me)
router.patch('/users', checkToken, updateName)
router.put('/users/change-password/', checkToken, changePassword)
router.post('/users/forget-password', checkToken, forgetPassword)
router.put('/users/new-password', checkToken, newPassword)


export default router