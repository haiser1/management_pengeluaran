import Users from "../models/UserModels.js"
import { generateOtp, sendOtp } from "../utils/Otp.js"

export const verifyOTP = async (req, res, next) => {
    try {
      const { email, otp } = req.body

      if(!email || !otp) return res.status(400).json({message: 'Data Cannot be Empty'})

      const user = await Users.findOne({
        where: {
          email: email
        }
      })
  
      if (!user) return res.status(404).json({ message: 'Email Not Found' })
  
      if (user.otpCode === otp && user.otpExpiration && user.otpExpiration > new Date()) {
        await Users.update(
          {
            emailVerified: true
          },
          {
            where: {
              email: email
            },
            returning: true
          }
        )

        return res.status(200).json({ message: 'Email Verified Successfully' })
      }

      return res.status(400).json({ message: 'Invalid OTP code or OTP code has expired, please re-request your OTP'})

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
        const otpExpiration = new Date(Date.now() + 5 * 60 * 1000)
        const user = Users.findOne({
            where: {
                email: email
            }
        })

        if(!user) return res.status(404).json({message: 'User Not Found'})

        if(user.emailVerified === true) return res.status(200).json({message: 'your email has been verified'})

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


