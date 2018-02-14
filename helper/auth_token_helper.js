'use strict'

var jwt = require('jsonwebtoken');
var User = require('../model/user');

const generateToken = function (userId) {
    return jwt.sign({ id: userId }, process.env.SECRET, {
        expiresIn: 86400 // expires in 24 hours
    });
}

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) return next(err);
            User.findById(decoded.id, function (err, user) {
                if (!user) {
                    err = new Error("User Not Found");
                    err.status = 404;
                    return next(err);
                } else {
                    req.user = user;
                    req.body.userId = decoded.id;
                    return next();
                }
            });
        });
    } else {
        var err = new Error("No access token");
        err.status = 401;
        return next(err);
    }
}

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;