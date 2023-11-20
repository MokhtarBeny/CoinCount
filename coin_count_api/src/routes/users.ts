import express from 'express';
const router = express.Router();

const ENDPOINT = "users";
const controller = require(`../controllers/${ENDPOINT}`);

router.get(`/${ENDPOINT}/`, controller.getUsers);
router.post(`/${ENDPOINT}/`, controller.createUser);
module.exports = router;