'use strict';

var express = require("express");
var router = express.Router();

//POST /signup
//Route for creating users
router.post("/signup", function (req, res) {
    res.json({
        response: "You sent me a POST request to /signup",
        body: req.body
    });
});

//POST /signin
//Route for users to login
router.post("/signin", function (req, res) {
    res.json({
        response: "You sent me a POST request to /signin",
        body: req.body
    });
});

//GET /posts
//Route for posts collection
router.get("/posts", function (req, res) {
    res.json({ response: "You sent me a GET request" });
});

//POST /posts
//Route for creating posts
router.post("/posts", function (req, res) {
    res.json({
        response: "You sent me a POST request",
        body: req.body
    });
});

//GET /posts/:id
//Route for specific post reading
router.get("/posts/:id", function (req, res) {
    res.json({
        response: "You sent me a GET request for ID " + req.params.id
    });
});

//PUT /posts/:id
//Route for specific post updating
router.put("/posts/:id", function (req, res) {
    res.json({
        response: "You sent me a PUT request for ID " + req.params.id,
        body: req.body
    });
});

//DELETE /posts/:id
//Route for specific post deleting
router.delete("/posts/:id", function (req, res) {
    res.json({
        response: "You sent me a DELETE request for ID " + req.params.id
    });
});

//GET /posts/:id/comments
//Route for comments collection
router.get("/posts/:id/comments", function (req, res) {
    res.json({
        response: "You sent me a GET request to /comments",
        postId: req.params.id
    });
});

//POST /posts/:id/comments
//Route for creating a comment
router.post("/posts/:id/comments", function (req, res) {
    res.json({
        response: "You sent me a POST request to /comments",
        postId: req.params.id,
        body: req.body
    });
});

//GET /posts/:id/comments/:cId
//Route for a specific comment reading
router.get("/posts/:id/comments/:cId", function (req, res) {
    res.json({
        response: "You sent me a GET request to /comments/:cId",
        postId: req.params.id,
        commentId: req.params.cId
    });
});

//PUT /posts/:id/comments/:cId
//Route for a specific comment reading
router.put("/posts/:id/comments/:cId", function (req, res) {
    res.json({
        response: "You sent me a PUT request to /comments/:cId",
        postId: req.params.id,
        commentId: req.params.cId,
        body: req.body
    });
});

//DELETE /posts/:id/comments/:cId
//Route for a specific comment reading
router.delete("/posts/:id/comments/:cId", function (req, res) {
    res.json({
        response: "You sent me a DELETE request to /comments/:cId",
        postId: req.params.id,
        commentId: req.params.cId
    });
});

module.exports = router;