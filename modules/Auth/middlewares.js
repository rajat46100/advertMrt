const { ErrorHandler } = require('../../utils');
const { verifyToken } = require('./token-handler');
const responses = require('../../utils/responses');

exports.Authentication = async (req, res, next) => {
  let token = req.headers.authorization || req.headers.Authorization;
  if (token) {
    token = token.substring(7);
    try {
      const user = verifyToken(token);
      req.user = user;
    } catch (err) {
      return responses(res).unauthorized(err);
    }
    next();
  } else {
    responses(res).unauthorized(ErrorHandler.UnAuthorizedAccess('No Token Supplied'));
  }
};
