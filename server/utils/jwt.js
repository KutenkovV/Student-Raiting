const jwt = require('jsonwebtoken')

module.exports.sign = async (user) => {
    return new Promise((resolve,reject) => {
        jwt.sign({
            username:user.username,
            email: user.email
        },process.env.JWT_SECRET,(err,token) => {
            if(err)
                return reject(err)
            return resolve(token)
        })
    })
    
}

module.exports.decode = async (token) => {
    return new Promise((resolve,reject) => {
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded) => {
            if(err)
                return reject(err)

            return resolve(decoded)
        })
    })
}