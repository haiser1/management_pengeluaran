import express from "express"
import {
    register,
    updateName,
    changePassword,
    forgetPassword,
    newPassword,
    me,
} from "../controllers/Users.js"
import { checkSession } from "../middleware/CheckSession.js"
const router = express.Router()

router.post('/users/register', register)
router.get('/users', checkSession, me)
router.patch('/users/:id', checkSession, updateName)
router.put('/users/change-password/:id', checkSession, changePassword)
router.put('/users/forget-password', checkSession, forgetPassword)
router.put('/users/new-password', checkSession, newPassword)


export default router