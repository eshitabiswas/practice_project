const Sequelize = require('sequelize');


const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql' // or the dialect of your database
});

module.exports = sequelize;