const sqlite3 = require('sqlite3');
const {open} = require('sqlite');
const connections = require('../models/connections');
const {Sequelize} = require("sequelize");

let db;

const initDb = async () => {
    // open the database
    if (!db) {
        db = new Sequelize({
            dialect: 'sqlite',
            storage: 'database.db'
        });
        const models = [
            require('../models/user').User,
            require('../models/token').Token,
            require('../models/photo').Photo,
            require('../models/tag').Tag,
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
