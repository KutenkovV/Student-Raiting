const authJwt  = require("../middleware/authJwt");
const controller = require("../controllers/user.controller");

module.exports = function(router) {

   router.use(function(req, res, next) {
    // console.log("x-header called")
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

   router.get("/test/all", controller.allAccess);

   router.get(
    "/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

};