import axios from 'axios';
import { parseString } from 'xml2js';
import { Request, Response } from 'express';
import sourceMapping from '../utils/sourceMapping';
import Source from '../models/sources';


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
    try {
        const sources = await Source.find({ active: true });

        if (sources.length === 0) {
            return res.send([]);
        }

        const fetchArticlesPromises = sources.map(async (source) => {
            const mapFunction = sourceMapping.mappingFunctions[source.name.toLowerCase()];
            if (!mapFunction) {
                console.error(`Mapping function not found for ${source.name}`);
                return []; // Skip this source
            }

            const response = await axios.get(source.url);
            const xml = response.data;
            return new Promise((resolve, reject) => {
                parseString(xml, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    const items = result.rss.channel[0].item;
                    const articles = items.map(mapFunction);
                    resolve(articles);
                });
            });
        });

        const articlesArrays = await Promise.all(fetchArticlesPromises);
        const articles = articlesArrays.flat();
        res.send(articles);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error fetching articles" });
    }
};



// export const getArticles = async (req: Request, res: Response) => {
//     const response = await axios.get("https://news.bitcoin.com/feed");
//     const xmlData = response.data;
//     parseString(xmlData, (err: any, result: any) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send({ error: "Error parsing XML" });
//         } else {
//             const articles = result.rss.channel[0].item.map((item: RssItem) => (
//                 {
//                     title: item.title[0],
//                     description: item.description[0],
//                     date: item.pubDate[0],
//                     link: item.link[0],
//                     image: item['bnmedia:post-thumbnail'][0]['bnmedia:url'][0],
//                     author: item["dc:creator"][0],
//                     categories: item.category.map((category: any) => category)
//                 }));
//             res.send(result.rss.channel[0].item);
//             return;
//             res.send(articles);
//         }
//     });

// }