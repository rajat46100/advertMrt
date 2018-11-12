const { Router } = require("../../utils");
const AuthController = require("./controller");
const Joi = require("joi");

const router = Router("Auth", "/auth");

router
    .get(
    "/login/:id/:password",
    {
      info: "Get Login Info",
      queryParams: {
        test: Joi.boolean().required()
      }
    },
    [AuthController.login]
  )
  .post(
    "/login",
    {
      info: "Login Service For User",
      queryParams: {},
      bodyParams: {
        username: Joi.string().required(),
        password: Joi.string().required()
      }
    },
    [AuthController.login]
  );

module.exports = router;
