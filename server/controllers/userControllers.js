const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateTokens');

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Create new user
    const user = await User.create({
        name,
        email,
        password
    });

    // If user creation is successful, send response with user details and token
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id), // generate token
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// Authenticate user
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // If user exists and password matches, send response with user details and token
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id), // generate token
        });
    } else {
        // If user doesn't exist or password doesn't match, send error response
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

module.exports = { registerUser, authUser };
