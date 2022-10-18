const { decode } = require("jsonwebtoken");
const models = require("../models/models");
module.exports.authByToken = async (req,res,next) => {
    
    //Check for Authorization header
    const authHeader = req.header('Authorization') ? req.header('Authorization').split(' ') : null
    
    if(!authHeader){
        return res.status(422).json({
            errors: { body: [ 'Authorization failed', 'No Authorization header' ] }
        })
    }

    //Check if authorization type is token
    if(authHeader[0] !== 'Token')
        return res.status(401).json({
            errors: { body: [ 'Authorization failed', 'Token missing' ] }
        })

    //Check if token is valid
    const token = authHeader[1];
    try{
        const user = await decode(token)
        
        if(!user) 
            throw new Error('No user found in token')
        const userDB = await models.User.findByPk(user.email)
        console.log(userDB.dataValues.date < new Date())
        if(userDB.dataValues.date < new Date())
            throw new Error('The token has expired')
        req.user = user
        return next()
    }catch(e) {
        return res.status(401).json({
            errors: { body: [ 'Authorization failed', e.message ] }
        })
    }
}