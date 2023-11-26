import express from 'express';
const router = express.Router();

const ENDPOINT: string = "cryptos";
const controller = require(`../controllers/${ENDPOINT}`);


router.get(`/${ENDPOINT}/`, (req, res) => {
    router.get("/cryptos", controller.getCryptosList)
    res.json({
        "hello": "world"
    })

});
module.exports = router;
