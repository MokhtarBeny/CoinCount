import express from 'express';
const router = express.Router();

const ENDPOINT: string = "admin";
const controller = require(`../controllers/${ENDPOINT}`);

router.get('/check-admin', controller.checkAdmin);

module.exports = router;
