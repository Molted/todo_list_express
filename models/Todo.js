 const mongoose = require('mongoose');

 const TodoSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, "Title field is required"]
    },
    description: {
        type: String,
    },
    is_complete: {
        type: Boolean,
        default: false
    }
 }, { timestamps: true });

 module.exports = mongoose.model('Todo', TodoSchema);