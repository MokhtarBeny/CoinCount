import axios from 'axios';
import express from 'express';
const router = express.Router();
import { parseString } from 'xml2js';


const ENDPOINT: string = "articles";
const controller = require(`../controllers/${ENDPOINT}`);

// function extractImageURLFromDescription(img: any) {
//     const match = img.match(/<img.*?src=["'](.*?)["']/);
//     return match ? match[1] : null;
//   }

router.get(`/${ENDPOINT}/`,
    async (req, res) => {

            const response = await axios.get("https://cointelegraph.com/rss");
            const xmlData = response.data;
            console.log(xmlData)

            parseString(xmlData, (err, result) => {
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
                    const articles = result.rss.channel[0].item.map((item: { title: any[]; description: any[]; pubDate: any[]; author: any[]; img: any[]; }) => ({
                        title: item.title[0],
                        description: item.description[0],
                        date: item.pubDate[0],
                        //image: item.enclosure[0],
                        // author: item.author[0],
                        //image : extractImageURLFromDescription(item.img[0]),
                        // image: item.enclosure ? item.enclosure[0].$.url : null,
                        // author: item.author ? item.author[0] : null,
                    }));
                    console.log(result.rss.channel)
    
                    res.send(articles);
                }   
            });

    });

module.exports = router;
