import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import logger from 'pino';
import jwt from 'jsonwebtoken';
import { UserSchema } from '../schema/user.schema'; // Import your Zod schema
import { z } from 'zod'
import UserModel from '../models/user.model';
import db from './../config/database.config';

// Import the User model from your models directory

// Environment variables
const { SECRET_KEY, passwordSaltRounds } = process.env;
console.log('key :' + SECRET_KEY, 'secret salt rounds :' + passwordSaltRounds);

// User registration
export const registerUser = async (req: Request, res: Response) => {

  const { username, email, password, contactnumber, address, role, age } = req.body;
  try {
    // Validate the request body using Zod schema
    const userData = UserSchema.parse(req.body);

    // Save the validated data to the database
    const user = new UserModel(userData);
    await user.save();

    // Send a success response
    res.status(201).json({ message: 'User created successfully', user });

  } catch (error) {
    // Handle validation errors from Zod
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }

    // Handle other types of errors (e.g., database errors)
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// User login
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });
    if (!user) return res.status(401).json({ message: "Invalid username, User not found" });

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
      const userData = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        age: user.age,
        address: user.address,
        contactnumber: user.contactnumber
      }
    // Generate a token
    const token = jwt.sign(userData, SECRET_KEY||'', { algorithm: 'HS256' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login Error', error);
  }
};

// Get user profile
export const getUserProfile = async (req: Request, res: Response) => {
  const username = req.body.username;
};
