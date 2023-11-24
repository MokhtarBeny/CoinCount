import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/users"
const JWT_SECRET = process.env.JWT_SECRET || 'SECRET'; // Use an environment variable

const generateJwt = (userId: string): string => {
    return jwt.sign({ id: userId }, JWT_SECRET, {
        expiresIn: "7d"
    });
};
const verifyJwt = (token: string): { userId: string } | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
        return { userId: decoded.id }; // Make sure this key matches what's set in generateJwt
    } catch (error) {
        return null; // Handle the error as needed
    }
};

// Registration function
export const register = async (req: Request, res: Response): Promise<Response> => {
    try {
        if (!req.body.username || !req.body.email || !req.body.password) res.status(400).json({ message: 'Username, email, and password are required' });
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User({ username, email, password });
        await user.save();
        user.password = undefined;
        const token = generateJwt(user._id);
        return res.status(201).json({ message: 'User created successfully', token, user });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error });
    }
};

// Login function
export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        if (!req.body.email || !req.body.password) res.status(400).json({ message: 'Username, email, and password are required' });
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // remove user.password;
        user.password = undefined;
        const token = generateJwt(user._id);
        return res.json({ message: 'Logged in successfully', token, user });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};


export const refreshToken = async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming token is sent in the Authorization header
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const decoded = verifyJwt(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    try {
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newToken = generateJwt(user._id);
        user.password = undefined;
        return res.json({ message: 'Token refreshed successfully', token: newToken, user });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};
