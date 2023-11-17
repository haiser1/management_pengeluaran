import express from 'express'
import {login,logout, refreshToken} from '../controllers/Auth.js'
import { checkEmail } from '../middleware/CheckEmail.js'
const router = express.Router()

router.post('/users/login', checkEmail, login)
router.delete('/logout', logout)
router.get('/users/refresh-token', refreshToken)

export default router