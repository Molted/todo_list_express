const express = require('express');
const { allUsers, registerUser, loginUser, currentUser } = require('../controllers/UserController');
const { validateToken } = require('../middleware/validateTokenHandler');

const router = express.Router();

router.get('/', validateToken, allUsers);

// Register User
// route POST /api/users/register
//* access public
router.post('/register', registerUser);

// Login User
// route POST /api/users/login
//* access public
router.post('/login', loginUser);

// Current User Detail
// route GET /api/users/current
//* access private
router.get('/user-info', validateToken, currentUser);

module.exports = router;