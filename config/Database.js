import { Sequelize } from "sequelize"

const db = new Sequelize('pengeluaran', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db