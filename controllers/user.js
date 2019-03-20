/*jshint esversion: 6 */
/* jshint node: true */
const model = require('../database/models/user');
const jwt = require('jsonwebtoken');

const { userModel } = model;

class Users {

    static signUp(req, res) {
        let { name, email, password, username } = req.body;
        return model.create({
            name,
            username,
            email,
            password
        }).then(
            userData => res.status(201).send({ success: true, message: 'User successfully created', userData }));
    }
}

module.exports = Users;