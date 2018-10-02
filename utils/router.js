const { addSwaggerPath } = require('./init-swagger');
const ErrorHandler = require('./error-handler');
const Joi = require('joi');

const GetExpressMiddlewares = (middlewares) => middlewares.map(middleware => MiddlewareWrapper(middleware));


const MiddlewareWrapper = (fn) => async function (req, res, next) {
    try {
        const response = await fn(req, res, next);
        if (response && !next) {
            res.send({
                success: false,
                error: err,
                data: null
            });
        }
    }
    catch (err) {
        res.send({
            success: false,
            error: err,
            data: null
        });
    }
}


const QueryParamsValidator = (queryObj) => {
    return MiddlewareWrapper(async function (req, res, next) {
        try {
            console.log('In Query Validator')
            await Joi.object(queryObj).validate(req.query);
            next();
        }
        catch (err) {
            const errorStack = err.details.map(detail => ({ key: ((detail || {}).context || {}).key, message: detail.message }));
            throw ErrorHandler.ValidationError('Parameters Validation Error', errorStack);
        }
    })
}


const BodyParamsValidator = (queryObj) => {
    return MiddlewareWrapper(async function (req, res, next) {
        try {
            await Joi.object(queryObj).validate(req.body);
            next();
        }
        catch (err) {
            const errorStack = err.details.map(detail => ({ key: ((detail || {}).context || {}).key, message: detail.message }));
            throw ErrorHandler.ValidationError('Parameters Validation Error', errorStack);
        }
    })
}




class Router {

    constructor(moduleName, baseUrl) {
        this.router = require('express').Router();
        this.moduleName = moduleName;
        this.baseUrl = baseUrl;
    }

    get(url, { queryParams = {}, info = "", consumes = ["application/json"], produces = ["application/json"] }, middlewares = []) {
        addSwaggerPath(this.baseUrl+url, 'get', info, consumes, produces, queryParams, {}, this.moduleName);
        this.router.get(url, QueryParamsValidator(queryParams), ...GetExpressMiddlewares(middlewares));
        return this;
    }

    post(url, { queryParams = {}, bodyParams = {}, info = "", consumes = ["application/json"], produces = ["application/json"] }, middlewares = []) {
        addSwaggerPath(this.baseUrl+url, 'post', info, consumes, produces, queryParams, bodyParams, this.moduleName);
        this.router.post(url, QueryParamsValidator(queryParams), BodyParamsValidator(bodyParams), ...GetExpressMiddlewares(middlewares));
        return this;
    }

    mount(app) {
        app.use(this.baseUrl, this.router);
    }


}


module.exports = (moduleName, baseUrl) => new Router(moduleName, baseUrl);