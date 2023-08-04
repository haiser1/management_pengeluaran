import { DATEONLY, Sequelize } from "sequelize"
import  Users  from "./UserModels.js"
import  db  from "../config/Database.js"

const {DataTypes} = Sequelize

const Pengeluaran = db.define('list_pengeluaran', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
},{
    freezeTableName: true
})

Users.hasMany(Pengeluaran)
Pengeluaran.belongsTo(Users, {foreignKey: 'userId'})

export default Pengeluaran