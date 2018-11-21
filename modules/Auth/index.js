const { Router } = require("../../utils");
const AuthController = require("./controller");
const Joi = require("joi");


const router = Router("Auth", "/auth");

router
    .get(
    "/login/:id/register",
    {
      info: "Get Login Info",
      queryParams: {
        test: Joi.boolean().required()
      },
      auth: true,
      log:'info'
    },
    
    [AuthController.forgotPassword]
  )
  .post(
    "/login",
    {
      info: "Login Service For User",
      bodyParams: {
        email: Joi.string().required(),
        password: Joi.string().required()
      },
      auth: true
    },
    [AuthController.login]
  );

module.exports = router;
