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
    },
    recur: {
        enabled: Boolean,
        mode: Number,
        recurred: { type : Boolean, default: false }
    },
    reminder: {
        enabled: Boolean,
        channels: {
            inApp: Boolean,
            email: Boolean
        },
        beforeMinutes: Number
    },
    createdAt: { type : Date, default: Date.now }
});

var todo = new mongoose.model('Todo', schema);
module.exports = todo;