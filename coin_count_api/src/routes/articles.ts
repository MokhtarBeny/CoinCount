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

// function extractImageURLFromDescription(img: any) {
//     const match = img.match(/<img.*?src=["'](.*?)["']/);
//     return match ? match[1] : null;
//   }

router.get(`/${ENDPOINT}/`,
    async (req, res) => {

        const response = await axios.get("https://www.coindesk.com/arc/outboundfeeds/rss/");
        const xmlData = response.data;

        parseString(xmlData, (err: any, result: any) => {
            // if (err) {
            //     console.error(err);
            //     res.status(500).send({ error: "Error parsing XML" });
            // } else 
            // {
            //     const articles =(result.rss.channel[0].item); 
            //     //res.send(articles);
            //     res.json({ articles });
            // }

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
                        image: item['media:content'][0]['$']['url'],
                        author: item["dc:creator"][0],
                    
                    }));
                res.send(articles)


            }
        });

    });
module.exports = router;
