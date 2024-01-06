import axios from 'axios';
import { parseString } from 'xml2js';

export const getArticles = async (req, res) => {
    try {
        const response = await axios.get("https://cointelegraph.com/rss");
        const xmlData = response.data;

        parseString(xmlData, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send({ error: "Error parsing XML" });
            } else {
                const articles = result; // Adjust this based on the actual structure of the XML
                res.send(articles);
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Internal Server Error" });
    }
};