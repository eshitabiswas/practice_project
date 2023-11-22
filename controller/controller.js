// const Hapi = require('@hapi/hapi');
// const { Sequelize } = require('sequelize');
const { UserModel } = require('../model/model');


const saveUser = async (req, h) => {
    try {
        const { username, email } = req.payload;
        const newUser = await UserModel.create({ username, email });
        // return h.response(newUser).code(201);
        if (newUser) {
            return h.response(newUser).code(200);
        } else {
            // return h.response(newUser).code(201);
            return h.response({ error: 'User can not added' }).code(201);

        }
    } catch (error) {
        return h.response(error.message).code(500);

    }
};

const updateUser = async (req, h) => {
    try {
        // const { username, email } = req.payload;
        const userIdToUpdate = 1; // User id
        const newData = {
            firstName: 'UpdatedFirstName',
            lastName: 'UpdatedLastName',
            email: 'updated.email@example.com',
        };
        const updatedUser = await UserModel.update(newData, {
            where: {
                id: userIdToUpdate,
            },
        })
        if (updatedUser) {
            return h.response(updatedUser).code(200);
        } else {
            return h.response({ error: 'User can not updated' }).code(201);
        }

    } catch (error) {
        return h.response(error.message).code(500);

    }
};
const deleteUser = async (req, h) => {
    try {
        // const { username, email } = req.payload;
        const userIdToDelete = 1;
        const newUser = UserModel.destroy({
            where: {
                id: userIdToDelete
            }
        })
        return h.response(newUser).code(200);
    } catch (error) {
        return h.response(error.message).code(500);

    }
};

module.exports = {
    saveUser,
    updateUser,
    deleteUser
};
