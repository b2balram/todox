var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    dueDate: { type : Date, default: Date.now },
    priority: Number,
    status: {
        type: Number,
        default: 0
    }
});

var todo = new mongoose.model('Todo', schema);
module.exports = todo;