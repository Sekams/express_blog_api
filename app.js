'use strict';

var express = require("express");
var app = express();
var routes = require("./routes");

var jsonParser = require("body-parser").json;
var logger = require("morgan");

//Log requests in console using Morgan
app.use(logger("dev"));

//Parse JSON objects from the requests
app.use(jsonParser());

//Handle HTTP routes
app.use("/v1", routes);

//Catch 404 and foward to error handler
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

var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log("Express server is listening on port", port);
});