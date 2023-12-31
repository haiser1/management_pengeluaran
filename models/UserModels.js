import { Sequelize } from "sequelize"

import db from '../config/Database.js'

const {DataTypes} = Sequelize

const Users = db.define('users', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allwNull: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allwNull: false,
        validate: {
            notEmpty: true,
            len: [3,100]
        }
    },
    email: {
        type: DataTypes.STRING,
        allwNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allwNull: false,
        validate: {
            notEmpty: true
        }
    },
    otpCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    otpExpiration: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    refreshToken: {
        type: DataTypes.TEXT
    }
},{
    freezeTableName: true
})

export default Users