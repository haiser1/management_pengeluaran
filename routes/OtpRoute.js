import express from 'express'
import { resetOtp, verifyEmail } from '../controllers/Otp.js'

const router = express.Router()

router.post('/users/verify-email', verifyEmail)
router.post('/users/reset-otp', resetOtp)

export default router