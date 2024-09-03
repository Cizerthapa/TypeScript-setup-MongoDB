import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
 // Import the User model from your models directory

// Environment variables
const { SECRET_KEY, passwordSaltRounds } = process.env;
console.log('key :' + SECRET_KEY, 'secret salt rounds :' + passwordSaltRounds);

// User registration
export const registerUser = async (req: Request, res: Response) => {
    
    const { username, password, email, role, fullname, last_login, status } = req.body;

    
};

// User login
export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    
};

// Get user profile
export const getUserProfile = async (req: Request, res: Response) => {
    const username = req.body.username;
};
