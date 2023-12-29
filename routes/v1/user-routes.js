const router = require('express').Router()

const UserController = require('../../api/controllers/UserController')
const { middleware } = require('../../middlewares/verify-token');

router.post('/sign-up',UserController.signUp);
router.post('/login-by-email',UserController.logIn);

router.post('/url-shortener',middleware,UserController.urlShortener);
router.get('/bit.ly/:url',middleware,UserController.redirectToLongURL);

module.exports = router