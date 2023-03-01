const nanoid = require("nanoid");
const {getDb} = require("./db");
const md5 = require('md5');

module.exports = {
    addUser: async (login, password) => {
        return await getDb().models.User.create({
            login,
            password: md5(password)
        });
    },
    getUsers: async () => await getDb().models.User.findAll(),
    getUserByLogin: async (login) => await getDb().models.User.findOne({where: {login}}),
    getUserById: async (id) => await getDb().models.User.findByPk(id),
};