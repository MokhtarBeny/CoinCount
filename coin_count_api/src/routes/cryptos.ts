import express from 'express';
const router = express.Router();


const ENDPOINT: string = "cryptos";
const controller = require(`../controllers/${ENDPOINT}`);


router.get(`/${ENDPOINT}/`, controller.getCryptosList);
router.get(`/${ENDPOINT}/:crypto_id`, controller.getCryptoById);
router.get(`/${ENDPOINT}/:crypto_id/history`, controller.getCryptoHistories);


module.exports = router;
