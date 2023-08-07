import express from 'express'
import {login,logout} from '../controllers/Auth.js'
import { checkEmail } from '../middleware/CheckEmail.js'
const router = express.Router()

router.post('/login', checkEmail, login)
router.delete('/logout', logout)

export default router