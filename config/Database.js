import { Sequelize } from "sequelize"


const db = new Sequelize(process.env.DB_NAME, 'root', process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
})
console.log(process.env.DB_USERNAME)

export default db