const Joi = require('joi');

const responses = require('../responses');
const logger = require('../logger');
const ErrorHandler = require('../error-handler');

function _filterObjectUsingKeys(obj1 = {}, obj2 = {}) {
  const keys = Object.keys(obj2);
  return Object.keys(obj1).reduce((acc, key) => {
    if (keys.find(objKey => objKey === key)) {
      acc[key] = obj1[key];
    }
    return acc;
  }, {});
}

exports.GetExpressMiddlewares = (middlewares, log, context) => middlewares.map(middleware => MiddlewareWrapper(middleware, log, context));

const MiddlewareWrapper = (fn, log, context) =>
  async function(req, res, next) {
    const startTime = Date.now();
    const newContext = context
      ? {
          queryParams: _filterObjectUsingKeys(req.query, context.queryParams),
          bodyParams: _filterObjectUsingKeys(req.body, context.bodyParams),
          response: _filterObjectUsingKeys(responses(res), context.responses)
        }
      : {
          queryParams: {},
          bodyParams: {},
          response: {}
        };

    try {
      const response = await fn.call(newContext, req, res, next, newContext);
      if (response || !next) {
        if ((log = 'info')) {
          logger.info({
            url: req.url,
            createDate: new Date().toISOString(),
            responseTime: (Date.now() - startTime) / 1000
          });
        }
      }
    } catch (err) {
      if (['info', 'error'].find(logLevel => logLevel === log)) {
        logger.error({
          url: req.url,
          err,
          createDate: new Date().toISOString(),
          responseTime: (Date.now() - startTime) / 1000
        });
      }
      return responses(res).internalServerError(err);
    }
  };

exports.MiddlewareWrapper = MiddlewareWrapper;

exports.QueryParamsValidator = (queryObj, log) => {
  return MiddlewareWrapper(async function(req, res, next) {
    try {
      await Joi.object(queryObj).validate(req.query);
      next();
    } catch (err) {
      const errorStack = err.details.map(detail => ({
        key: ((detail || {}).context || {}).key,
        message: detail.message
      }));
      return responses(res).badRequest(ErrorHandler.ValidationError('Parameters Validation Error', errorStack));
    }
  }, log);
};

exports.BodyParamsValidator = (queryObj, log) => {
  return MiddlewareWrapper(async function(req, res, next) {
    try {
      await Joi.object(queryObj).validate(req.body);
      next();
    } catch (err) {
      const errorStack = err.details.map(detail => ({
        key: ((detail || {}).context || {}).key,
        message: detail.message
      }));
      return responses(res).badRequest(ErrorHandler.ValidationError('Parameters Validation Error', errorStack));
    }
  }, log);
};
