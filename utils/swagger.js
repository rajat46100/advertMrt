const config = require('config');

module.exports = {
    "swagger": "2.0",
    "info": {
        "description":  config.swagger.description,
        "version": config.swagger.version,
        "title": config.swagger.title,
        "termsOfService": config.swagger.termsOfService,
        "contact": {
            "email": config.swagger.contactEmail
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    "host": `${config.swagger.host}:${config.swagger.port}`,
    "basePath": config.swagger.basePath,
    "schemes": config.swagger.schemes,
    "tags": [],
    "paths": {},
    "definitions": {},
    "securityDefinitions": {
        "api_key": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header"
        }
    },
    "externalDocs": {
        "description": "Find out more about Swagger",
        "url": "http://swagger.io"
    }
}
