const Sequelize = require('sequelize');
const User = require('../model/model');

const sequelize = new Sequelize('crud_test', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
});


module.exports = sequelize;