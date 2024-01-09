const { verify } = require('jsonwebtoken');

module.exports = {
    middleware: (req,res,next)=>{
        let token = req.get('authorization');
        if(token){
            token = token.slice(7);
            verify(token,process.env.JWT_SECRET,(err,decoded)=>{
                if(err){
                    res.json({
                        success:false,
                        message: "Invalid Token"
                    })
                }else{
                    next()
                }
            })
        }else{
            res.json({
                success: false,
                message: "Access denied! Unauthorized user"
            })
        }
    }
}