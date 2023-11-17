
import { configDotenv } from 'dotenv'
import mail from 'nodemailer'
configDotenv()

// generate OTP
export const generateOtp = () => {
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += Math.floor(Math.random() * 10).toString();
    }
    return otp;
  }

// send OTP to email
export const sendOtp = (email, OTP) => {
    const transporter = mail.createTransport({
        service: 'hotmail', // if you use gmail, change to gmail, or another service
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    })

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP Code is: ${OTP}
OTP Code expired in 3 minutes`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(`Tejadi kesalahan dalam mengirim email Error: ${error}`)
        }
        console.log(`Email sukses dikirm: ${info.response}`)
    })
}
