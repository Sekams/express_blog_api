'use scrict';

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//Define comment schema
var CommentSchema = new Schema({
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    body: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

//Add update method onto the Comment Schema
CommentSchema.method("update", function (updates, callback) {
    Object.assign(this, updates, { updatedAt: new Date() });
    this.save(callback);
});

//Get comment model from schema
var Comment = mongoose.model("Comment", CommentSchema);

//Export comment model
module.exports = Comment;