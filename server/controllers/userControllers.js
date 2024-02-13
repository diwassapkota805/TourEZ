const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateTokens');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password
    });

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

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log("I have received the request");
    const user = await User.findOne({ email });


    if (user && (await user.matchPassword(password))) { // if user exists and password matches
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id), // generate token
        });
        console.log("Password matches");
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

module.exports = { registerUser, authUser };