const asyncHandler = require('express-async-handler');
const Todo = require('../models/Todo');

// Get all Todos
exports.allTodos = asyncHandler( async (req, res) => {
    const todos = await Todo.find({user_id: req.user.id});
    res.json(todos);
});

// Get a specific Todo
exports.getTodo = asyncHandler( async (req, res) => {
    // includes todoHandler middleware
    res.json(req.todo);
});

// Create
exports.createTodo = asyncHandler( async (req, res) => {
    const { title, description } = req.body;
    if(!title || !description)
    {
        res.status(400);
        throw new Error('All fields are required!');
    }

    const todo = await Todo.create({
        title, description, user_id: req.user.id
    });

    res.json(todo);
});

// Update
// 63f62323dac31f63a7d24794
exports.updateTodo = asyncHandler( async (req, res) => {
    // includes contactHandler middleware
    const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            description: req.body.description,
            is_complete: req.body.is_complete
        },
        {
            new: true
        });

    res.status(200).json({ updatedTodo });
});

// Delete
exports.deleteTodo = asyncHandler( async (req, res) => {
    // includes contactHandler middleware
    await req.todo.remove();
    res.status(200).json({ todo: req.todo });
});