import express from 'express';
const router = express.Router();

const ENDPOINT: string = "users";
const controller = require(`../controllers/${ENDPOINT}`);


router.get("/refresh_token", controller.refreshToken)
router.post(`/register`, controller.register)
router.post(`/login`, controller.login)
router.post(`/social-signin`, controller.socialSignIn)
router.get(`/${ENDPOINT}/`, controller.getUsers);
module.exports = router;