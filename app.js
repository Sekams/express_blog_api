'use strict';

var express = require("express");
var app = express();
var userRoutes = require("./route/user_routes");
var postRoutes = require("./route/post_routes");

var jsonParser = require("body-parser").json;
var logger = require("morgan");

//Log requests in console using Morgan
app.use(logger("dev"));

//Parse JSON objects from the requests
app.use(jsonParser());

//Handle Database Connections using Mongoose Library
var mongoose = require("mongoose");

//Connect to the database
mongoose.connect("mongodb://localhost:27017/express_blog_api_db");

//Assign database connection to a variable
var db = mongoose.connection;

//Catch database connection errors
db.on("error", function (err) {
    console.error("connection error:", err);
});

//Open database connection
db.once("open", function () {
    console.log("db connection successful");
});

//Handle Cross Origin Request permissions
app.use(function (req, res, next) {
    //Allow requests from all origins
    res.header("Access-Control-Allow-Origin", "*");
    //All Headers that are allowed 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === "OPTIONS") {
        //All Methods allowed on the API 
        res.header("Access-Control-Allow-Methods", "POST, PUT, DELETE");
        return res.status(200).json({});
    }
    next();
});

//Handle HTTP routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/posts", postRoutes);

//Catch 404 errors and foward them to the error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//Error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

//Pick the port from environment variables if it exists or set it to 3000
var port = process.env.PORT || 3000;

//Run the application on specified port
app.listen(port, function () {
    console.log("Express server is listening on port", port);
});