const bcrypt = require('bcrypt');
const userData = require('../models/user');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const validRoles = ['Student', 'Admin','Teacher'];

// ----------------------------------------
// SIGNUP CONTROLLER
// ----------------------------------------

exports.signUp = async (req, res) => {
    try {
        const { title,surname, email, password, role } = req.body;

        // Validation
        if (!title || !surname || !email || !password || !role ) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields.',
            });
        }

        // Role check
        if (!validRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: `Invalid role. Must be one of: ${validRoles.join(', ')}`,
            });
        }

        // Check if user already exists
        const existingUser = await userData.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email.',
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await userData.create({
            title,
            surname,
            email,
            password: hashedPassword,
            role,
        });

        return res.status(201).json({
            success: true,
            message: 'User registered successfully.',
        });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            success: false,
            message: 'Server error during signup.',
        });
    }
};


// ----------------------------------------
// LOGIN CONTROLLER
// ----------------------------------------

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both email and password.',
            });
        }

        // Check if user exists
        const existingUser = await userData.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: 'User does not exist.',
            });
        }

        // Match password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect password.',
            });
        }

        // Create token payload
        const payload = {
            id: existingUser._id,
            email: existingUser.email,
            role: existingUser.role,
            title: existingUser.title,
            surname:existingUser.surname,
        };
       
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '2h',
        });

        // Set cookie options
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
            httpOnly: true,
        };

        // Set cookie
        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user: {
                id: existingUser._id,
                email: existingUser.email,
                role: existingUser.role,
                title: existingUser.title,
                surname:existingUser.surname,
            },
            message: 'User logged in successfully.',
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: 'Server error during login.',
        });
    }
};
