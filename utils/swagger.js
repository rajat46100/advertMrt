const config = require('config');

module.exports = {
    "swagger": "2.0",
    "info": {
        "description":  config.description,
        "version": config.version,
        "title": config.title,
        "termsOfService": config.termsOfService,
        "contact": {
            "email": config.contactEmail
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    "host": `${config.host}:${config.port}`,
    "basePath": config.basePath,
    "schemes": [
        "http"
    ],
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
