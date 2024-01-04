import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from "../models/users";

const JWT_SECRET = process.env.JWT_SECRET || 'SECRET';

const verifyJwt = (token: string): { userId: string } | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
        return { userId: decoded.id };
    } catch (error) {
        return null;
    }
};

export const checkAdmin = async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = verifyJwt(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        const user = await User.findById(decoded.userId);
        console.log(user + " user not found")
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has a role field and if it's 'admin'
        if (!user.role || user.role !== 'admin') {
          console.log(user + " user  role ")

            return res.status(403).json({ message: 'Access denied: User is not an admin' });
        }

        return res.json({ message: 'User is an admin', isAdmin: true });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};
