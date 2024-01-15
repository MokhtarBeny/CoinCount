import express from 'express';
const router = express.Router();


const ENDPOINT: string = "sources";
const controller = require(`../controllers/${ENDPOINT}`);


router.get(`/${ENDPOINT}/`, controller.getSources);
router.post(`/${ENDPOINT}/`, controller.addSource);
router.delete(`/${ENDPOINT}/:id`, controller.deleteSource);
router.put(`/${ENDPOINT}/:id`, controller.toggleActiveSource);



module.exports = router;
