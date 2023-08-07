import express from 'express'
import cors from 'cors'
import session from 'express-session'
import dotenv from 'dotenv'
import verifyOtp from './routes/OtpRoute.js'
import UsersRoute from './routes/UsersRoute.js'
import AuthRoute from './routes/AuthRoute.js'
import PengeluaranRoute from './routes/PengeluaranRoute.js'
import db  from './config/Database.js'
import sequelizeStore from 'connect-session-sequelize'
import {errorHandling} from './middleware/ErrorHandling.js'
// import Pengeluaran from './models/PengeluaranModels.js'
// import Users from './models/UserModels.js'

dotenv.config()

const app = express()

// create table session
const sessionSrore = sequelizeStore(session.Store)
const store = new sessionSrore({
    db: db,
})

try {
    db.authenticate()
    console.log('Success Connnect to Database')
    // await Pengeluaran.sync()
} catch (error) {
    console.error(error)
    
}

// store.sync()
// create tables
// ;(async() =>{
//     await Pengeluaran.sync()
// })()

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure:'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: 'your frontend'
}))

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