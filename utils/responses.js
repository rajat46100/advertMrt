const APIResponse = require('./api.response');

const HTTP_CODES = {
  ok: 200,
  created: 201,
  internalServerError: 500,
  badRequest: 400,
  unauthorized: 401
};

module.exports = Object.assign(
  res => {
    return {
      ok: data => res.status(HTTP_CODES.ok).send(APIResponse.SendSuccess(data)),
      created: data => res.status(HTTP_CODES.created).send(APIResponse.SendSuccess(data)),
      badRequest: error => res.status(HTTP_CODES.badRequest).send(APIResponse.SendError(error)),
      internalServerError: error => res.status(HTTP_CODES.internalServerError).send(APIResponse.SendError(error)),
      unauthorized: error => res.status(HTTP_CODES.unauthorized).send(APIResponse.SendError(error))
    };
  },
  { HTTP_CODES }
);
