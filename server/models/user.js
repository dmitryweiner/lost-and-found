const {DataTypes} = require("sequelize");
const {getDb} = require("../db");
const bcrypt = require('bcrypt');

const User = sequelize => {
  const UserModel = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    login: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    }
  });
  UserModel.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  }
  return UserModel;
}

module.exports = {
  User,
  addUser: async (login, password) => {
    return await getDb().models.User.create({
      login,
      password
    });
  },
  getUsers: async () => await getDb().models.User.findAll(),
  getUserByLogin: async (login) => await getDb().models.User.findOne({where: {login}}),
  getUserById: async (id) => await getDb().models.User.findByPk(id),
}
