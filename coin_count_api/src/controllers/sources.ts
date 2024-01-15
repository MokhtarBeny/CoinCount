import Source from '../models/sources';
import { Request, Response } from 'express';


export const getSources = async (req: Request, res: Response) => {
    try {
        const sources = await Source.find();
        res.status(200).json(sources);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export const addSource = async (req: Request, res: Response) => {
    try {
        let { name, url } = req.body;
        if (url[url.length - 1] === '/') url = url.slice(0, -1);
        const source = new Source({ name, url });
        await source.save();
        const sources = await Source.find();
        res.status(201).json({ success: true, sources });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const deleteSource = async (req: Request, res: Response) => {
    try {
        const source = await Source.findById(req.params.id);
        if (!source) throw Error('No source found');
        await Source.findOneAndDelete({ _id: req.params.id });

        const sources = await Source.find();
        res.status(200).json({ success: true, sources });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const toggleActiveSource = async (req: Request, res: Response) => {
    try {
    const type = req.body.type;
    const source = await Source.findById(req.params.id);
    if (!source) throw Error('No source found');
    let message = "";
    if (type === 'activate') {
        source.active = true;
        message = "This source has been activated."
    } else if (type === 'deactivate') {
        source.active = false;
        message = "This source has been deactivated."
    }
    await source.save();

    const sources = await Source.find();

    res.status(203).json({ success: true, sources, message });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


