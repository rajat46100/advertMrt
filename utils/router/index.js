const responses = require('../responses');
const { addSwaggerPath } = require('../init-swagger');
const { BodyParamsValidator, GetExpressMiddlewares, MiddlewareWrapper, QueryParamsValidator } = require('./helper');

let _authenticationFn = async (req, res, next) => {
  next();
};

class Router {
  constructor(moduleName, baseUrl) {
    this.router = require('express').Router();
    this.moduleName = moduleName;
    this.baseUrl = baseUrl;
  }

  get(url, { queryParams = {}, auth = false, log = 'error', info = '', reponses = {}, consumes = ['application/json'], produces = ['application/json'], responses }, middlewares = []) {
    attachRoute.call(this, 'get', {
      url,
      queryParams,
      auth,
      log,
      info,
      reponses,
      consumes,
      produces,
      responses,
      middlewares
    });
    return this;
  }

  post(url, { queryParams = {}, bodyParams = {}, log = 'error', auth = false, info = '', consumes = ['application/json'], produces = ['application/json'], responses = {} }, middlewares = []) {
    attachRoute.call(this, 'post', {
      url,
      queryParams,
      bodyParams,
      auth,
      log,
      info,
      responses,
      consumes,
      produces,
      responses,
      middlewares
    });
    return this;
  }

  put(url, { queryParams = {}, bodyParams = {}, reponses = {}, auth = false, log = 'error', info = '', consumes = ['application/json'], produces = ['application/json'] }, middlewares = []) {
    attachRoute.call(this, 'post', {
      url,
      queryParams,
      bodyParams,
      auth,
      log,
      info,
      reponses,
      consumes,
      produces,
      responses,
      middlewares
    });
    return this;
  }

  mount(app) {
    app.use(this.baseUrl, this.router);
  }

  static setAuthentication(fn) {
    _authenticationFn = fn;
  }
}

module.exports = Object.assign((moduleName, baseUrl) => new Router(moduleName, baseUrl), {
  setAuthentication: Router.setAuthentication
});

function attachRoute(method, { info, url, consumes, produces, queryParams = {}, bodyParams = {}, responses = {}, auth = false, log = false, middlewares = [] }) {
  addSwaggerPath(this.baseUrl + url, method, info, consumes, produces, queryParams, bodyParams, this.moduleName, auth, responses);
  this.router[method](
    url,
    auth ? MiddlewareWrapper(_authenticationFn, log) : (req, res, next) => next(),
    QueryParamsValidator(queryParams, log),
    BodyParamsValidator(bodyParams, log),
    ...GetExpressMiddlewares(middlewares, log, {
      responses,
      bodyParams,
      queryParams
    })
  );
}
