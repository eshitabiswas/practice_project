const Hapi = require('@hapi/hapi');
const userController = require('./controller/controller');
const sequelize = require('./config/sequelize');
const routes = require('./router/router');


const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route(routes);

    async function initializeSequelize() {
        try {
            await sequelize.authenticate();
            console.log('Connection to the database has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    initializeSequelize();
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

