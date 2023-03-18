const {DataTypes} = require("sequelize");

const Tag = sequelize => sequelize.define('Tag', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    indexes: [
        {
            using: "BTREE",
            fields: ["name"]
        }
    ]
});

module.exports = {
    Tag
}
