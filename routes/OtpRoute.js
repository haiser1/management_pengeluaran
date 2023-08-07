import express from 'express'
import { resetOtp, verifyOTP } from '../controllers/Otp.js'

const router = express.Router()

router.post('/users/verify-email', verifyOTP)
router.post('/users/reset-otp', resetOtp)

export default router