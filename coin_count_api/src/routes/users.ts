import express from 'express';
const router = express.Router();

const ENDPOINT: string = "users";
const controller = require(`../controllers/${ENDPOINT}`);

router.get(`/${ENDPOINT}/`, (req, res) => {

    res.send('Hello World!');
});
module.exports = router;