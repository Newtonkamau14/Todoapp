const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    todo: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Todo',todoSchema)