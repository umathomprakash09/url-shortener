const UserService = require('../services/UserService');
const userService = new UserService()

module.exports = {
    urlShortener: async(req,res)=>{
        const inputs = req.body;
        const shortURL = await userService.urlShortener(inputs);
        res.send(shortURL);
    },
    redirectToLongURL: async(req,res)=>{
        const inputs = req.params;
        const longURL = await userService.redirectToLongURL(inputs);
        res.redirect(longURL);
    },
}

