const {DataTypes} = require("sequelize");

const Photo = sequelize => sequelize.define('Photo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = {
    Photo
}
