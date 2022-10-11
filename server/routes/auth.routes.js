const authJwt  = require("../middleware/authJwt");
const authController = require("../controllers/auth.controller");
const router = require("./routes");

module.exports = function(router) {

    router.use(function(req, res, next) {
    //   console.log("x-header called")
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    // router.post(
    //   "/api/auth/signup",
    //   [
    //     verifySignUp.checkDuplicateUsernameOrEmail,
    //     verifySignUp.checkRolesExisted
    //   ],
    //   controller.signup
    // );

    router.post("/auth/signup", authController.signup);
    router.post("/auth/signin", authController.signin);
  };