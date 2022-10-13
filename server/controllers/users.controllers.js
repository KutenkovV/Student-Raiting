const models = require("../models/models");
const { Op } = require("sequelize");
const {hashPassword,matchPassword} = require('../utils/password')
const {sign,decode} = require('../utils/jwt')

//
class UsersController {

    async createUser (req,res) {
        try{
            if(!req.body.user.username) throw new Error("Требуется логин")
            if(!req.body.user.email) throw new Error("Требуется электронная почта")
            if(!req.body.user.password) throw new Error("Требуется ввести пароль")
            
            const existingUser = await models.User.findByPk(req.body.user.email)
            if(existingUser)
                throw new Error('Пользователь уже существует с этим идентификатором электронной почты')
    
            const password = await hashPassword(req.body.user.password);
            const user = await models.User.create({
                username: req.body.user.username,
                password: password,
                email: req.body.user.email,
            })
            
            if(user){
                if(user.dataValues.password)
                    delete user.dataValues.password
                user.dataValues.token = await sign(user)
                res.status(201).json({user})
            }    
        }catch (e){
            res.status(422).json({errors: { body: [ 'Could not create user ', e.message ] }})
        }   
    }


    async loginUser (req, res) {
        try {
            if (!req.body.user.email) throw new Error("Требуется электронная почта")
            if (!req.body.user.password) throw new Error("Требуется ввести пароль")

            const user = await models.User.findByPk(req.body.user.email)

            if (!user) {
                res.status(401)
                throw new Error('Нет пользователя с этим идентификатором электронной почты')
            }

            //Check if password matches
            const passwordMatch = await matchPassword(user.password, req.body.user.password)

            if (!passwordMatch) {
                res.status(401)
                throw new Error('Неверный пароль или идентификатор электронной почты')
            }

            delete user.dataValues.password
            user.dataValues.token = await sign({ email: user.dataValues.email, username: user.dataValues.username })

            res.status(200).json({ user })
        } catch (e) {
            const status = res.statusCode ? res.statusCode : 500
            res.status(status).json({ errors: { body: ['not user ', e.message] } })
        }
    }
}

module.exports = new UsersController();