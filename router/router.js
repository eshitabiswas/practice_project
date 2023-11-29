const userController = require('../controller/controller')

const routes = [
    {
        method: 'POST',
        path: '/api/user/add',
        handler: userController.saveUser,
    },
    {
        method: 'PUT',
        path: '/api/user/update/{id}',
        handler: userController.updateUser,
    },
    {
        method: 'DELETE',
        path: '/api/user/delete/{id}',
        handler: userController.deleteUser,
    },
    {
        method: 'GET',
        path: '/api/user/list',
        handler: userController.allUserList,
    },
    {
        method: 'POST',
        path: '/api/user/registration',
        handler: userController.userRegistration,
    },
    {
        method: 'POST',
        path: '/api/user/login',
        handler: userController.userLogin,
    },
];

module.exports = routes;




