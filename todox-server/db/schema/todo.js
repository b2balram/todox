var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ''
    },
    dueDate: { type : Date, default: Date.now },
    priority: Number,
    status: Number
});

var todo = new mongoose.model('Todo', schema);
module.exports = todo;