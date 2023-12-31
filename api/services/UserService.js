const models = require('../../models');
const jwt = require('jsonwebtoken')
const {genSaltSync,hashSync, compare} = require('bcrypt');
class UserService{
    constructor(){

    }
    async urlShortener(inputs){
        const inputURL = inputs.url;
        const webAdress = 'http://localhost:3030/user/bit.ly/';
        const urlData = await models.URLShortener.findOne(
            {
            where:{
                url:inputURL
            },
            raw:true
        });
        //console.log("URLData: ",urlData)
        if(urlData){
            return {short_url:`${webAdress}${urlData.short_url}`};
        }
        const shortURL = await this.handleLongToShortURL(inputURL);
        return {short_url:`${webAdress}${shortURL}`};
    }
    async handleLongToShortURL(longURL){
        const base=62, alphabets = [], digits=[];
        let currentValue; 
        //console.log(models.URLShortener);
        const urlData = await models.URLShortener.create({url:longURL});
        currentValue = urlData.dataValues.id;
        let shortURL="";
        //now generating its base 62 encoding
        while(currentValue>0){
            let reminder = currentValue%base;
            digits.push(reminder);
            currentValue = Math.floor(currentValue/base);  // Math.floor for Integer division
        }
        digits.reverse();
        //base 62 of format [a-zA-Z0-9]
        for(let i=0;i<26;i++){
            alphabets[i] = String.fromCharCode('a'.charCodeAt()+i);
            alphabets[i+26] = String.fromCharCode('A'.charCodeAt()+i);
        }
        for(let i=0;i<10;i++){
            alphabets.push(String.fromCharCode('0'.charCodeAt()+i));
        }
        for(let i=0;i<digits.length;i++){
            shortURL+=alphabets[digits[i]];
        }
        //now update short url in table
       // console.log("Short URL is: ",shortURL);
        await models.URLShortener.update({
            short_url:shortURL
        },{
            where:{
                id:urlData.dataValues.id
            }
        })
        return shortURL;

    }
    async redirectToLongURL(inputs){
        const shortURL = inputs.url
        console.log(shortURL);
        const urlData = await models.URLShortener.findOne({
            where:{
                short_url:shortURL
            },
            raw:true,
            attributes:['url']
        });
        //console.log("URLData: ",urlData);
        if(urlData){
            return urlData.url
        }else{
           throw new Error("notFound");
        }
    }
    async singUp(inputs){
        
        if(!inputs.user_name || inputs.user_name.trim().length==0){
            return {result:"Failed",message:"User Name required"};
        }
        if(!inputs.email || inputs.email.trim().length<7){
            return {result:"Failed",message:"Email required"};
        }
        if(!inputs.password || inputs.password.length<5){
            return {result:"Failed",message:"Password  required and should be atleast 5 digits/character!"};
        }
        const salt = genSaltSync(10);
        inputs.password = hashSync(inputs.password,salt);
        let isUserExists = await models.User.findOne({
            where:{
                email: inputs.email
            }
        })
        
        if(isUserExists){
            return {status:401,message:"User with this Email already exists."}
        }
       
        let user=await models.User.create({
            user_name:inputs.user_name.trim(),
            email: inputs.email.trim(),
            password: inputs.password,
            access_token: inputs.access_token
        })
        return user;

    }
    async logIn(inputs){
        if(!inputs.email || inputs.email.trim().length<7){
            return {result:"Failed",message:"Email required"};
        }
        if(!inputs.password || inputs.password.length<5){
            return {result:"Failed",message:"Password  required"};
        }
        const salt = genSaltSync(10);
        let isUserExists = await models.User.findOne({
            where:{
                email: inputs.email
            },
            raw:true
        })
        if(!isUserExists){
            return {status:401,message:"User does not exists with this email id."}
        }
       
        let isValidPassword = await compare(inputs.password,isUserExists.password);
        if(!isValidPassword){
            return {status:401,message:"Invalid password."}
        }
        let token  = jwt.sign({userId:isUserExists.id},process.env.JWT_SECRET,{expiresIn:"1d"});
        let user = {status:200,message:"User logged in successfully!!!",token:token};
        return user;

    }
}

module.exports = UserService