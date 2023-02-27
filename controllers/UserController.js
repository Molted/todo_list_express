const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.allUsers = asyncHandler(async (req, res) => {
    const users = await User.find();

    res.json(users);
});

// Register a User
exports.registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory!');
    }

    const userAvailable = await User.findOne({email});

    if(userAvailable) {
        res.status(400);
        throw new Error('User already registered!');
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({username, email, password: hashPassword});

    res.json({
        message: "User Successfully Created",
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    });
});

// Login a User
exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    if(!email || !password)
    {
        res.status(400);
        throw new Error('All fields are mandatory!');
    }

    const user = await User.findOne({email});

    if (!user) {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    const accessToken = jwt.sign({
        user: {
            username: user.username,
            email: user.email,
            id: user.id
        }
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});

    res.status(200).json({user, accessToken})

});

// Current User Detail
exports.currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});