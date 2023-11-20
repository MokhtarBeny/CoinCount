import { Request, Response } from 'express';
import User from '@/models/users';

// CREATE
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).json(user.toJSON());
        await user.save();
        res.status(200).json(user);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// READ
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) throw new Error('User not found');
        res.json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// UPDATE
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) throw new Error('User not found');
        Object.assign(user, req.body);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// DELETE
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) throw new Error('User not found');
        await user.remove();
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
