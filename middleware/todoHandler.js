const asyncHandler = require('express-async-handler');
const Todo = require('../models/Todo');

// Middleware to check if contact exists and belongs to current user
// Route
exports.todoHandler = asyncHandler(async (req, res, next) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        res.status(404);
        throw new Error("Todo not found");
    }

    if (todo.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error('Permission denied!');
    }

    req.todo = todo;
    next();

})