const { TokenExpiredError, sign, verify } = require('jsonwebtoken');
const { ErrorHandler } = require('../../utils');

const {
  jwt: { secretKey }
} = require('config');

exports.createToken = data => {
  return sign(data, secretKey);
};

exports.verifyToken = token => {
  try {
    return verify(token, secretKey);
  } catch (error) {
    console.log(error);
    if (error instanceof TokenExpiredError) {
      throw ErrorHandler.TokenExpiredError();
    }
    throw ErrorHandler.UnAuthorizedAccess();
  }
};
