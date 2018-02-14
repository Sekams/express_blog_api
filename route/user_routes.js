'use strict';

var express = require("express");
var router = express.Router();
var User = require("../model/user");
const GeneralHelper = require("../helper/general_helper");
const AuthTokenHelper = require("../helper/auth_token_helper");

//POST /user/signup
//Route for creating users
router.post("/signup", function (req, res, next) {
    if (GeneralHelper.validateParams(req, ["firstName", "lastName", "username", "password", "email"])) {
        User.find({ $or: [{ username: req.body.username.toLowerCase() }, { email: req.body.email.toLowerCase() }] }, function (err, doc) {
            if (err) return next(err);
            if (doc.length > 0) {
                err = new Error("User already exists");
                err.status = 409;
                return next(err);
            } else {
                var user = new User(req.body);
                user.username = req.body.username.toLowerCase();
                user.email = req.body.email.toLowerCase();
                user.save(function (err, user) {
                    if (err) return next(err);
                    res.status(201);
                    res.json({
                        token: AuthTokenHelper.generateToken(user.id)
                    });
                });
            }
        });
    } else {
        var err = new Error("Parameter(s) missing");
        err.status = 422;
        return next(err);
    }
});

//POST /user/signin
//Route for users to login
router.post("/signin", function (req, res, next) {
    if (GeneralHelper.validateParams(req, ["username", "password"])) {
        User.findOne({ username: req.body.username.toLowerCase() }, function (err, user) {
            if (err) return next(err);
            if (user) {
                user.comparePassword(req.body.password, function (err, isMatching) {
                    if (err) throw err;
                    if (isMatching) {
                        res.status = 200;
                        res.json({
                            token: AuthTokenHelper.generateToken(user.id)
                        });
                    } else {
                        err = new Error("Invalid username or password");
                        err.status = 401;
                        return next(err);
                    }
                });
            } else {
                err = new Error("Invalid username or password");
                err.status = 401;
                return next(err);
            }
        });
    } else {
        var err = new Error("Parameter(s) missing");
        err.status = 422;
        return next(err);
    }
});

module.exports = router;