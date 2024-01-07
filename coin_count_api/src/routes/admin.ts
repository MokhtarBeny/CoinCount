import express from 'express';
import {adminAuthMiddleware } from '../utils/middleware/admin'
const router = express.Router();

const ENDPOINT: string = "admin";
const controller = require(`../controllers/${ENDPOINT}`);

router.get('/check-admin', controller.checkAdmin);
router.post('/update-crypto',adminAuthMiddleware , controller.updateCryptoVisibility);
router.get('/admin-cryptos',adminAuthMiddleware , controller.getCryptosList);

module.exports = router;
