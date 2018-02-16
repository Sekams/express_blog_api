'use scrict';

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//Define post schema
var PostSchema = new Schema({
    userId: { type: String, required: true },
    author: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

//Add update method to the Post Schema
PostSchema.method("update", function (updates, callback) {
    Object.assign(this, updates, { updatedAt: new Date() });
    this.save(callback);
});

//Get post model from schema
var Post = mongoose.model("Post", PostSchema);

//Export post model
module.exports = Post;