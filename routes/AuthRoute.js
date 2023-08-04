import express from 'express'
import {login,logout,me} from '../controllers/Auth.js'
import { checkSession } from '../middleware/AuthUsers.js'
const router = express.Router()

router.post('/login', login)
router.get('/me', checkSession, me)
router.delete('/logout', logout)

export default router