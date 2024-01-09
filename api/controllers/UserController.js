const UserService = require('../services/UserService');
const userService = new UserService()
const userError = require('../../error-messages/user-error')
module.exports = {
    urlShortener: async(req,res,next)=>{
        const inputs = req.body;
        const shortURL = await userService.urlShortener(inputs);
        res.send({success:true,...shortURL});
    },
    redirectToLongURL: async(req,res,next)=>{
        try{
            const inputs = req.params;
        const longURL = await userService.redirectToLongURL(inputs);
        res.redirect(longURL);
        }catch(error){
            next({status:userError[error.message]?.status,message:userError[error.message]?.message})
        }
        
    },
    signUp: async(req,res,next)=>{
        const inputs = req.body;
        const user = await userService.singUp(inputs);
        res.status(user.status||200).send({message:user.message||user});
    },
    logIn: async(req,res,next)=>{
        const inputs = req.body;
        const user = await userService.logIn(inputs);
        res.status(user.status||200).send({status:true,message:user.message,token:user.token});
    }
}

