const models = require('../../models');

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
           throw new Error("Someothererror");
        }
    }
}

module.exports = UserService