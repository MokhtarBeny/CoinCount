import express from 'express';
const router = express.Router();

const ENDPOINT: string = "admin";
const controller = require(`../controllers/${ENDPOINT}`);

router.get('/check-admin', controller.checkAdmin);
router.post('/update-crypto', controller.updateCryptoVisibility);

module.exports = router;
