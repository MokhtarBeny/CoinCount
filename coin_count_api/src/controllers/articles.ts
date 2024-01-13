import axios from 'axios';
import { parseString } from 'xml2js';
import { Request, Response } from 'express';


interface RssItem {
    title: string[];
    description: string[];
    pubDate: string[];
    link: string[];
    "media:content": Array<{ $: { url: string } }>;
    "dc:creator": string[];
    category: Array<{ _: string }>;

}


export const getArticles = async (req: Request, res: Response) => {
    // const response = await axios.get("https://www.coindesk.com/arc/outboundfeeds/rss/");
    const response = await axios.get("https://www.coindesk.com/feed");

    const xmlData = response.data;
    parseString(xmlData, (err: any, result: any) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: "Error parsing XML" });
        } else {
            const articles = result.rss.channel[0].item.map((item: RssItem) => (
                {
                    title: item.title[0],
                    description: item.description[0],
                    date: item.pubDate[0],
                    link: item.link[0],
                    image: item["media:content"] ? item["media:content"][0].$.url : null,
                    author: item["dc:creator"][0],
                    categories: item.category.map((category: any) => category._)
                }));
            res.send(articles);

        }
    });

}