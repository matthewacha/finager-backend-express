/*jshint esversion: 6 */
/* jshint node: true */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const passport = require('passport');
var {
    generateToken,
    sendToken
} = require('../utils/token.utils');
require('../passport');

const middleware = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
};

router.use(middleware);
// joining finager
router.post('/auth/google', passport.authenticate('google-token', { session: false }),
    function(req, res, next) {
        if (!req.user) {
            return res.send(401, 'User Not Authenticated')
        }
        req.auth = {
            id: req.user.id
        };
        next();
    }, generateToken, sendToken);



module.exports = router;