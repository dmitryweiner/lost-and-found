const nanoid = require("nanoid");
const {DataTypes} = require("sequelize");
const {getDb} = require("../db");

const Token = sequelize => sequelize.define('Token', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = {
    Token,
    getUserIdByToken: async (token) => {
        const result = await getDb().models.Token.findOne({where: {token}});
        return result?.UserId;
    },
    deleteByToken: async (token) => {
        await getDb().models.Token.destroy({where: {token}});
    },
    addToken: async (UserId) => {
        const token = nanoid();
        const tokenRow = await getDb().models.Token.findOne({where: {UserId}});
        if (tokenRow) {
            tokenRow.token = token;
            await tokenRow.save();
        } else {
            const newTokenRow = await getDb().models.Token.create({token});
            const user = await getDb().models.User.findByPk(UserId);
            await newTokenRow.setUser(user);
        }
        return token;
    }
}
