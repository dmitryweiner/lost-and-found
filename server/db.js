require('dotenv').config();
const connections = require('./models/connections');
const {Sequelize} = require("sequelize");

let db;

const initDb = async () => {
    // open the database
    if (!db) {
        db = new Sequelize(process.env.DATABASE_URL, {
            logging: false
        });
        const models = [
            require('./models/user').User,
            require('./models/token').Token,
            require('./models/photo').Photo,
            require('./models/tag').Tag,
        ];
        for(const model of models) {
            model(db);
        }
        connections(db);
        db.sync();
    }
};

const getDb = () => db;

module.exports = {
    initDb,
    getDb
}
