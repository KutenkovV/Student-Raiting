const sequelize = require("../db");
const { DataTypes } = require("sequelize");


const User = sequelize.define("users",
    {
        id: {
            type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(50), allowNull: false, 
        },
        email: {
            type: DataTypes.STRING(256), allowNull: true, 
        },
        password: {
            type: DataTypes.STRING(100), allowNull: false,
        },

    },
    {
        tableName: "users",
        createdAt: false,
        updatedAt: false,
    });

module.exports = { User };