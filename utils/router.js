const { addSwaggerPath } = require('./init-swagger');
const ErrorHandler = require('./error-handler');
const Joi = require('joi');
const APIResponse = require('./api.response');
const logger = require('./logger');

const GetExpressMiddlewares = (middlewares, log) => middlewares.map(middleware => MiddlewareWrapper(middleware, log));


const MiddlewareWrapper = (fn, log) => async function (req, res, next) {
    const startTime = Date.now();
    try {
        const response = await fn(req, res, next);
        if (response || !next) {
            if(log = 'info'){
                logger.info({ url: req.url, response, createDate: new Date().toISOString(), responseTime: (Date.now() - startTime)/1000   });
            }    
            res.send(APIResponse.SendSuccess(response));
        }
    }
    catch (err) {
        if(['info', 'error'].find(logLevel=> logLevel === log)){
            logger.error({ url: req.url, err, createDate: new Date().toISOString(), responseTime: (Date.now() - startTime)/1000    });
        }
        res.send(APIResponse.SendError(err));
    }
}


const QueryParamsValidator = (queryObj, log) => {
    return MiddlewareWrapper(async function (req, res, next) {
        try {
            console.log('In Query Validator');
            await Joi.object(queryObj).validate(req.query);
            next();
        }
        catch (err) {
            const errorStack = err.details.map(detail => ({ key: ((detail || {}).context || {}).key, message: detail.message }));
            throw ErrorHandler.ValidationError('Parameters Validation Error', errorStack);
        }
    }, log)
}


const BodyParamsValidator = (queryObj, log) => {
    return MiddlewareWrapper(async function (req, res, next) {
        try {
            await Joi.object(queryObj).validate(req.body);
            next();
        }
        catch (err) {
            const errorStack = err.details.map(detail => ({ key: ((detail || {}).context || {}).key, message: detail.message }));
            throw ErrorHandler.ValidationError('Parameters Validation Error', errorStack);
        }
    }, log)
}


let _authenticationFn = async(req, res, next)=>{
    next();
}

class Router {

    constructor(moduleName, baseUrl) {
        this.router = require('express').Router();
        this.moduleName = moduleName;
        this.baseUrl = baseUrl;
    }

    get(url, { queryParams = {}, auth = false, log = 'error', info = "", consumes = ["application/json"], produces = ["application/json"] }, middlewares = []) {
        addSwaggerPath(this.baseUrl+url, 'get', info, consumes, produces, queryParams, {}, this.moduleName, auth);
        this.router.get(url,  auth ? MiddlewareWrapper(_authenticationFn, log) : (req, res, next) => next(), QueryParamsValidator(queryParams, log), ...GetExpressMiddlewares(middlewares, log));
        return this;
    }

    post(url, { queryParams = {}, bodyParams = {}, log = 'error', auth = false, info = "", consumes = ["application/json"], produces = ["application/json"] }, middlewares = []) {
        addSwaggerPath(this.baseUrl+url, 'post', info, consumes, produces, queryParams, bodyParams, this.moduleName, auth);
        this.router.post(url,  auth ? MiddlewareWrapper(_authenticationFn, log) : (req, res, next) => next(), QueryParamsValidator(queryParams, log), BodyParamsValidator(bodyParams, log), ...GetExpressMiddlewares(middlewares, log));
        return this;
    }

    put(url, { queryParams = {}, bodyParams = {}, auth = false, log = 'error', info = "", consumes = ["application/json"], produces = ["application/json"] }, middlewares = [] ){
        addSwaggerPath(this.baseUrl+url, 'put', info, consumes, produces, queryParams, bodyParams, this.moduleName, auth);
        this.router.put(url,  auth ? MiddlewareWrapper(_authenticationFn, log) : (req, res, next) => next(), QueryParamsValidator(queryParams, log), BodyParamsValidator(bodyParams, log), ...GetExpressMiddlewares(middlewares, log));
        return this;    
    }
    
    mount(app) {
        app.use(this.baseUrl, this.router);
    }

    static setAuthentication(fn){
        _authenticationFn = fn;
    }


}


module.exports = Object.assign((moduleName, baseUrl) => new Router(moduleName, baseUrl), { setAuthentication: Router.setAuthentication } );