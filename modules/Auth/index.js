const { Router } = require('../../utils');
const AuthController = require('./controller');
const Joi = require('joi');

const router = Router('Auth', '/auth');

router
  .post(
    '/send-otp',
    {
      bodyParams: {
        mobileNumber: Joi.string()
      },
      responses: {
        ok: 'If successfully is successfully generated',
        internalServerError: 'In case of server error'
      }
    },
    [AuthController.sendOtp]
  )
  .post(
    '/verify-otp',
    {
      bodyParams: {
        mobileNumber: Joi.string(),
        otp: Joi.string().length(4)
      },
      responses: {
        ok: 'If successfully is successfully generated',
        internalServerError: 'In case of server error',
        badRequest: 'If wrong otp and mobile number combination entered'
      }
    },
    [AuthController.verifyOTP]
  )
  .post(
    '/update-profile',
    {
      bodyParams: {
        name: Joi.string(),
        city: Joi.string()
      },
      responses: {
        ok: 'If successfully is successfully generated',
        internalServerError: 'In case of server error',
        unauthorized: 'If invalid token supplied or token expired'
      },
      auth: true
    },

    [AuthController.updateProfile]
  );

module.exports = router;
