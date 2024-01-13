import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/users"
import mongoose from 'mongoose';
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
        const token = generateJwt(user._id.toString());
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
        if (!user.password) return res.status(400).json({ message: 'Password not found' });
        const isMatch = await bcrypt.compare(password, user.password.toString());
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials111111' });
        }
        // remove user.password;
        user.password = undefined;
        const token = generateJwt(user._id.toString());
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
        const newToken = generateJwt(user._id.toString());
        user.password = undefined;
        return res.json({ message: 'Token refreshed successfully', token: newToken, user });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};



export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}
export const socialSignIn = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { user, account } = req.body;
        let dbUser = await User.findOne({
            $or: [
                { 'socialAccounts.providerAccountId': account.providerAccountId },
                { email: user.email }
            ]
        });
        if (!dbUser) {
            dbUser = new User({
                username: user.name,
                email: user.email,
                socialAccounts: [{
                    provider: account.provider,
                    providerAccountId: account.providerAccountId
                }]
            });
            await dbUser.save();
        } else {
            const socialAccountExists = dbUser.socialAccounts.some(
                acc => acc.providerAccountId === account.providerAccountId
            );
            if (!socialAccountExists) {
                dbUser.socialAccounts.push({
                    provider: account.provider,
                    providerAccountId: account.providerAccountId
                });
                await dbUser.save();
            }
        }
        const token = generateJwt(dbUser._id.toString());
        return res.status(200).json({
            message: 'Social sign-in successful',
            token,
            user: {
                id: dbUser._id,
                username: dbUser.username,
                email: dbUser.email,
                socialAccounts: dbUser.socialAccounts
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};


export const changePassword = async (req: Request, res: Response): Promise<Response> => {
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
        const { password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        await user.save();
        user.password = undefined;
        const newToken = generateJwt(user._id.toString());
        return res.json({ message: 'Password changed successfully', token: newToken, user });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}

export const changeUsername = async (req: Request, res: Response): Promise<Response> => {
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
        const { username } = req.body;
        user.username = username;
        await user.save();
        user.password = undefined;
        const newToken = generateJwt(user._id.toString());
        return res.json({ message: 'Username changed successfully', token: newToken, user });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}

export const addToWatchlist = async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    let decoded;
    try {
        decoded = verifyJwt(token);
    } catch (error: any) {
        return res.status(401).json({ message: 'Invalid token', error: error.message });
    }

    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        const user = await User.findById(decoded.userId).populate('watchlist');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { cryptoId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(cryptoId)) {
            return res.status(400).json({ message: 'Invalid cryptocurrency ID' });
        }
        const cryptoObjectId = new mongoose.Types.ObjectId(cryptoId);

        if (!user.watchlist.includes(cryptoObjectId)) {
            user.watchlist.push(cryptoObjectId);
            await user.save();

        }
        user.password = undefined;
        return res.json({ message: 'Crypto added to watchlist successfully', user });
    }
    catch (error: any ) {
        console.log(error); 
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const removeFromWatchlist = async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    let decoded;
    try {
        decoded = verifyJwt(token);
    } catch (error: any ) {
        return res.status(401).json({ message: 'Invalid token', error: error.message });
    }
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    try {
        const user = (await User.findById(decoded.userId));
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const cryptoId = req.params.cryptoId; // Assuming cryptoId is in the URL
        if (!mongoose.Types.ObjectId.isValid(cryptoId)) {
            return res.status(400).json({ message: 'Invalid cryptocurrency ID' });
        }
        user.watchlist = user.watchlist.filter(crypto => crypto.toString() !== cryptoId);
        await user.save();
           // Re-fetch the user and populate the watchlist to reflect the updated state
           const updatedUser = await User.findById(decoded.userId).populate('watchlist');
           updatedUser.password = undefined; // Hide password
        return res.json({ message: 'Crypto removed from watchlist successfully', user: updatedUser });
    }
    catch (error: any ) {
        console.log(error); 
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const getWatchlist = async (req: Request, res: Response): Promise<Response> => {
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
        const user = await User.findById(decoded.userId).populate('watchlist');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user.watchlist);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}
export const resetWatchlist = async (req: Request, res: Response): Promise<Response> => {
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
        user.watchlist = [];
        await user.save();
        user.password = undefined;
        const newToken = generateJwt(user._id.toString());
        return res.json({ message: 'Watchlist reset successfully', token: newToken, user });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}
