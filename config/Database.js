import { Sequelize } from "sequelize"

import dotenv from 'dotenv'

dotenv.config()

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: '127.0.0.1',
    dialect: 'mysql',
})

export default db