import axios from 'axios';
import express from 'express';
const router = express.Router();
import { parseString } from 'xml2js';


interface RssItem {
    title: string[];
    description: string[];
    pubDate: string[];
    link: string[];
    "media:content": Array<{ $: { url: string } }>;
    "dc:creator": string[];

}

const ENDPOINT: string = "articles";
const controller = require(`../controllers/${ENDPOINT}`);

router.get(`/${ENDPOINT}/`, controller.getArticles);
module.exports = router;
