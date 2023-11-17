import Users from "../models/UserModels.js"
import { generateOtp, sendOtp } from "../utils/Otp.js"

export const verifyEmail = async (req, res, next) => {
    try {
      const { email, otp } = req.body

      if(!email || !otp) return res.status(400).json({message: 'Data Cannot be Empty'})

      const user = await Users.findOne({
        where: {
          email: email
        }
      })

      if (!user) return res.status(404).json({ message: 'Email Not Found' })

      if(user.emailVerified !== false) return res.status(200).json({message: 'your email has been verified'})

      if(user.otpCode !== otp) return res.status(400).json({message: 'Invalid Otp Code'})

      if(new Date() > user.otpExpiration) return res.status({message: 'The OTP code expires'})

      await Users.update({
        emailVerified: true
      }, {
        where: {
          email: email
        }
      })

      return res.status(200).json({message: 'Email verified successfuly'})

    } catch (error) {
      next(error)
    }
  };
  
// reset otp for verified email
export const resetOtp = async (req, res, next) => {
    try {
        const {email} = req.body

        if(!email) return res.status(400).json({message: 'Email Cannot be Empty'})

        const otp = generateOtp()
        const otpExpiration = new Date(Date.now() + 3 * 60 * 1000) // 3 menit
        const user = await Users.findOne({
            where: {
                email: email
            }
        })

        if(!user) return res.status(404).json({message: 'Email Not Found'})

        if(user.emailVerified !== false) return res.status(200).json({message: 'your email has been verified'})

        Users.update({
            otpCode: otp,
            otpExpiration: otpExpiration,
        }, {
            where: {
                email: email
            }
        })

        sendOtp(email,otp)
        return res.status(200).json({message: 'Check OTP Code in Your Email'})

    } catch (error) {
        next(error)
    }
}


