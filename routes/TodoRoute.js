const express = require('express');
const { allTodos, createTodo, getTodo, updateTodo, deleteTodo } = require('../controllers/TodoController');
const { todoHandler } = require('../middleware/todoHandler');
const { validateToken } = require('../middleware/validateTokenHandler');

const router = express.Router();

router.use(validateToken);
router.get('/', allTodos);
router.get('/:id', todoHandler, getTodo);
router.post('/', createTodo);
router.patch('/:id', todoHandler, updateTodo);
router.delete('/:id', todoHandler, deleteTodo);

module.exports = router;