import express from 'express'
import cors from 'cors'
import session from 'express-session'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import verifyOtp from './routes/OtpRoute.js'
import UsersRoute from './routes/UsersRoute.js'
import AuthRoute from './routes/AuthRoute.js'
import PengeluaranRoute from './routes/PengeluaranRoute.js'
import db  from './config/Database.js'
import {errorHandling} from './middleware/ErrorHandling.js'


dotenv.config()

const app = express()

try {
    db.authenticate()
    console.log('Success Connnect to Database')
    // await ModelsName.sync() // import dulu models nya
} catch (error) {
    console.error(error)
    
}


app.use(cors({
    credentials: true,
    origin: 'ip address frontend'
}))

app.use(cookieParser())
app.use(express.json())
app.use(verifyOtp)
app.use(UsersRoute)
app.use(PengeluaranRoute)
app.use(AuthRoute)
app.use(errorHandling)


const port = process.env.PORT || 3002
app.listen(port, () => {
    console.log(`server run in port ${port}`)
})