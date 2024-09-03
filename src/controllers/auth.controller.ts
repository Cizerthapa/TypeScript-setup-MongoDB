import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
    const { username, password, role, fullname } = req.body;

    try {
        // Check if user already exists

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Registration Error', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Log in a user
export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Find the user
        

        // Check the password
        

        // Generate JWT token
       

        res.status(200).json({ message: 'Login successful' + 'here is the token : ' });
    } catch (err) {
        console.error('Login Error', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Example logout function (optional, depends on your setup)
// Logout generally means client-side action, but you can invalidate tokens server-side if needed
export const logoutUser = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Logged out successfully' });
};
