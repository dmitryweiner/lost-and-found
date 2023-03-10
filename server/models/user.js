const md5 = require("md5");
const {DataTypes} = require("sequelize");
const {AuthError} = require("../errors");
const {getDb} = require("../db");
const {getUserIdByToken} = require("../models/token");

const User = sequelize => sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = {
    User,
    addUser: async (login, password) => {
        return await getDb().models.User.create({
            login,
            password: md5(password) // TODO: use bcrypt
        });
    },
    getUsers: async () => await getDb().models.User.findAll(),
    getUserByLogin: async (login) => await getDb().models.User.findOne({where: {login}}),
    getUserById: async (id) => await getDb().models.User.findByPk(id),
}
