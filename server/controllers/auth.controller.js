const userModel = require("../models/user.model");
const config = require("../config/auth.config");
const sequelize = require("../db");

const User = userModel.User;

// const Op = userModel.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

class AuthController {

    //войти
    async signin(req, res) {

        const users = await User.findAll({
            attributes: ["id", "username", "password"],
        })

        console.log(users)

        // user - найденный пользователь 
        User.findOne({
            where: {
                username: req.body.username
            }
        })
            .then(user => {
                if (!user) {
                    return res.status(404).send({ message: "User Not found." });
                }

                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );

                if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
                } else { //password is valid

                    var token = jwt.sign({ id: user.id }, config.secret, {
                        expiresIn: 86400 // 24 hours
                    });

                    return res.status(200).send({
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        accessToken: token
                    });
                }



                //var authorities = [];
                // user.getRoles().then(roles => {
                //     for (let i = 0; i < roles.length; i++) {
                //         authorities.push("ROLE_" + roles[i].name.toUpperCase());
                //     }
                //     res.status(200).send({
                //         id: user.id,
                //         username: user.username,
                //         email: user.email,
                //         roles: authorities,
                //         accessToken: token
                //     });
                // });
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    };

    //train
    async signup(req, res) {

       //  await User.sync({ force: true });
        const username = "Akita";
        const email = "Akita@gmail.com";
        var password = "12345678";
        //закодировать пароль
        password = bcrypt.hashSync(password, 8)
        // console.log(password)

        User.create({ username: username, email: email, password: password }).then(user => {
            return res.status(200).send({ message: "added: " + user });
        })
            .catch(err => { return res.status(500).send({ message: err.message }); })

        //await sequelize.query(`INSERT INTO "users" ("username","email","password") VALUES ('${username}', '${email}', '${password}')`);
    }

}


//DELETE---------------------------------------------------------------------------------------------------------------------------


//без регистрации и ролей

// exports.signup = (req, res) => {
//   // Save User to Database
//   User.create({
//     username: req.body.username,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 8)
//   })
// };



// exports.signin = (req, res) => {
//   User.findOne({
//     where: {
//       username: req.body.username
//     }
//   })
//     .then(user => {
//       if (!user) {
//         return res.status(404).send({ message: "User Not found." });
//       }

//       var passwordIsValid = bcrypt.compareSync(
//         req.body.password,
//         user.password
//       );

//       if (!passwordIsValid) {
//         return res.status(401).send({
//           accessToken: null,
//           message: "Invalid Password!"
//         });
//       }

//       var token = jwt.sign({ id: user.id }, config.secret, {
//         expiresIn: 86400 // 24 hours
//       });

//       var authorities = [];
//       user.getRoles().then(roles => {
//         for (let i = 0; i < roles.length; i++) {
//           authorities.push("ROLE_" + roles[i].name.toUpperCase());
//         }
//         res.status(200).send({
//           id: user.id,
//           username: user.username,
//           email: user.email,
//           roles: authorities,
//           accessToken: token
//         });
//       });
//     })
//     .catch(err => {
//       res.status(500).send({ message: err.message });
//     });
// };

//DELETE---------------------------------------------------------------------------------------------------------------------------

module.exports = new AuthController();