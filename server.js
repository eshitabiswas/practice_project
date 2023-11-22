const Hapi = require('@hapi/hapi');
const {
    userController,
} = require('./controller/controller');


const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        // method: 'GET',
        // path: '/',
        // handler: (request, h) => {
        //     return 'Hello, Hapi.js!';
        // }
        method: 'POST',
        path: '/api/user/add', // Define the path for your POST route
        handler: userController.saveUser,
    });

    server.route({
        // method: 'GET',
        // path: '/',
        // handler: (request, h) => {
        //     return 'Hello, Hapi.js!';
        // }
        method: 'POST',
        path: '/api/user/update', // Define the path for your POST route
        handler: userController.updateUser,
    });

    server.route({
        // method: 'GET',
        // path: '/',
        // handler: (request, h) => {
        //     return 'Hello, Hapi.js!';
        // }
        method: 'POST',
        path: '/api/user/delete', // Define the path for your POST route
        handler: userController.deleteUser,
    });




    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

