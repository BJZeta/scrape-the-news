var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    username: {
        type: String
    },
    body: {
        type: String
    }
});

var Comment = mongoose.model('Comments', CommentSchema);

module.exports = Comment;