const UserModel = require('../model/model');
const { Op } = require('sequelize');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');


const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
});

const saveUser = async (req, h) => {
    try {
        const validationResult = userSchema.validate(req.payload);

        if (validationResult.error) {
            return h.response({ error: validationResult.error.details[0].message }).code(400);
        }

        const { firstName, lastName, email } = req.payload;
        const userobj = await UserModel.findOne({
            where: {
                email
            },
            attributes: ['id'],
            raw: true
        });

        if (userobj) {
            return h.response({ error: 'User already exists' }).code(400);
        }

        const newUser = await UserModel.create({ firstName, lastName, email });

        if (newUser) {
            return h.response(newUser).code(200);
        } else {
            return h.response({ error: 'User cannot be added' }).code(400);
        }
    } catch (error) {
        return h.response(error.message).code(500);
    }
};


const updateUser = async (req, h) => {
    try {
        const userIdToUpdate = parseInt(req.params.id); // User id
        const newData = {
            firstName: req.payload.firstName,
            lastName: req.payload.lastName,
            email: req.payload.email,
        };

        const userobj = await UserModel.findOne({
            where: {
                email: req.payload.email,
                id: {
                    [Op.ne]: userIdToUpdate
                },
            },
            attributes: ['id'],
            raw: true
        })

        if (userobj) {
            return h.response({ error: 'User already exist' }).code(400);
        }

        const updatedUser = await UserModel.update(newData, {
            where: {
                id: userIdToUpdate,
            },
        })

        if (updatedUser) {
            return h.response(updatedUser).code(200);
        } else {
            return h.response({ error: 'User can not updated' }).code(400);
        }

    } catch (error) {
        return h.response(error.message).code(500);

    }
};


const deleteUser = async (req, h) => {
    try {
        const userIdToDelete = parseInt(req.params.id);
        const newUser = await UserModel.destroy({
            where: {
                id: userIdToDelete
            }
        })
        return h.response(newUser).code(200);
    } catch (error) {
        return h.response(error.message).code(500);

    }
};

const allUserList = async (req, h) => {
    try {
        const userList = await UserModel.findAll()
        if (userList) {
            return h.response(userList).code(200);
        } else {
            return h.response({ error: 'User list not found' }).code(400);
        }
    } catch (error) {
        return h.response(error.message).code(500);

    }
};


const userRegistrationSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
});

const userRegistration = async (req, h) => {
    try {
        let validationResult = userRegistrationSchema.validate(req.payload);

        if (validationResult.error) {
            return h.response({ error: validationResult.error.details[0].message }).code(400);
        }

        let { firstName, lastName, email, password, phone } = req.payload;
        let userobj = await UserModel.findOne({
            where: {
                email
            },
            attributes: ['id'],
            raw: true
        });

        if (userobj) {
            return h.response({ error: 'User already exists' }).code(400);
        }

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        let newUser = await UserModel.create({ firstName, lastName, email, password: hashedPassword, phone });

        if (newUser) {
            return h.response(newUser).code(200);
        } else {
            return h.response({ error: 'User cannot be added' }).code(400);
        }
    } catch (error) {
        return h.response(error.message).code(500);
    }
};

const userLoginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
});

const userLogin = async (req, h) => {
    try {
        const validationResult = userLoginSchema.validate(req.payload);

        if (validationResult.error) {
            return h.response({ error: validationResult.error.details[0].message }).code(400);
        }

        const { password, email } = req.payload;
        const userobj = await UserModel.findOne({
            where: {
                email
            },
        });

        if (userobj) {
            let userPassword = userobj.password
            let isPasswordValid = await bcrypt.compare(password, userPassword);
            if (isPasswordValid) {

                const secretKey = 'eshita@89';

                const payload = {
                    userId: userobj.id,
                    username: userobj.firstName
                };

                const token = Jwt.sign(payload, secretKey, { expiresIn: '1h' });

                const responseData = {
                    message: 'User has been logged in successfully',
                    data: {
                        token,
                        userobj
                    }
                };

                return h.response(responseData).code(200);
            } else {
                return h.response({ error: 'Invalid Password' }).code(400);
            }
        }
        else {
            return h.response({ error: 'User not found' }).code(400);
        }
    } catch (error) {
        return h.response(error.message).code(500);
    }
};

module.exports = {
    saveUser,
    updateUser,
    deleteUser,
    allUserList,
    userRegistration,
    userLogin
};
