'use strict';

var express = require("express");
var router = express.Router();
var User = require("../model/user");
var Post = require("../model/post");
var Comment = require("../model/comment");
const GeneralHelper = require("../helper/general_helper");
const AuthTokenHelper = require("../helper/auth_token_helper");

//Handle all requests with the pId parameter
router.param("pId", function (req, res, next, id) {
    Post.findById(id, function (err, post) {
        if (err) return next(err);
        if (!post) {
            err = new Error("Not Found");
            err.status = 404;
            return next(err);
        }
        req.post = post;
        req.body.postId = post.id;
        return next();
    });
});

//Handle all requests with the cId parameter
router.param("cId", function (req, res, next, id) {
    Comment.findById(id, function (err, comment) {
        if (err) return next(err);
        if (!comment) {
            err = new Error("Not Found");
            err.status = 404;
            return next(err);
        }
        req.comment = comment;
        req.commentId = comment.id;
        return next();
    });
});

//GET /posts
//Route for posts collection
router.get("/", function (req, res, next) {
    Post.find({})
        .sort({ createdAt: -1 })
        .exec(function (err, posts) {
            if (err) return next(err);
            res.json(posts);
        });
});

//POST /posts
//Route for creating posts
router.post("/", AuthTokenHelper.verifyToken, function (req, res, next) {
    if (GeneralHelper.validateParams(req, ["userId", "title", "body"])) {
        var post = new Post(req.body);
        post.author = req.user.firstName + " " + req.user.lastName;
        post.save(function (err, post) {
            if (err) return next(err);
            res.status(201);
            res.json(post);
        });
    } else {
        var err = new Error("Parameter(s) missing");
        err.status = 422;
        return next(err);
    }
});

//GET /posts/:pId
//Route for specific post reading
router.get("/:pId", function (req, res) {
    res.json(req.post);
});

//PUT /posts/:pId
//Route for specific post updating
router.put("/:pId", AuthTokenHelper.verifyToken, function (req, res) {
    req.post.update(req.body, function (err, result) {
        if (err) return next(err);
        res.json(result);
    });
});

//DELETE /posts/:pId
//Route for specific post deleting
router.delete("/:pId", AuthTokenHelper.verifyToken, function (req, res) {
    req.post.remove(function (err) {
        if (err) return next(err);
        res.json({
            response: "Post was deleted"
        });
    });
});

//GET /posts/:pId/comments
//Route for comments collection
router.get("/:pId/comments", function (req, res) {
    Comment.find({ postId: req.post.id })
        .sort({ createdAt: -1 })
        .exec(function (err, comments) {
            if (err) return next(err);
            res.json(comments);
        });
});

//POST /posts/:pId/comments
//Route for creating a comment
router.post("/:pId/comments", AuthTokenHelper.verifyToken, function (req, res, next) {
    if (GeneralHelper.validateParams(req, ["userId", "postId", "body"])) {
        var comment = new Comment(req.body);
        comment.author = req.user.firstName + " " + req.user.lastName;
        comment.save(function (err, comment) {
            if (err) return next(err);
            res.status(201);
            res.json(comment);
        });
    } else {
        var err = new Error("Parameter(s) missing");
        err.status = 422;
        return next(err);
    }
});

//GET /posts/:pId/comments/:cId
//Route for a specific comment reading
router.get("/:pId/comments/:cId", function (req, res) {
    res.json(req.comment);
});

//PUT /posts/:pId/comments/:cId
//Route for a specific comment updating
router.put("/:pId/comments/:cId", AuthTokenHelper.verifyToken, function (req, res, next) {
    if (GeneralHelper.validateParams(req, ["body"])) {
        req.comment.update(req.body, function (err, result) {
            if (err) return next(err);
            res.json(result);
        });
    } else {
        var err = new Error("Parameter 'body' missing");
        err.status = 422;
        return next(err);
    }
});

//DELETE /posts/:pId/comments/:cId
//Route for a specific comment deleting
router.delete("/:pId/comments/:cId", AuthTokenHelper.verifyToken, function (req, res) {
    req.comment.remove(function (err) {
        if (err) return next(err);
        res.json({
            response: "Comment was deleted"
        });
    });
});

module.exports = router;