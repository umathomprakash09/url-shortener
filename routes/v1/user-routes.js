const router = require('express').Router()

const UserController = require('../../api/controllers/UserController')

router.post('/url-shortener',UserController.urlShortener);
router.get('/bit.ly/:url',UserController.redirectToLongURL);

module.exports = router