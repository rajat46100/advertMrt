const SwaggerDoc = require('./swagger');


exports.addSwaggerPath = (path, method, info, consumes, produces, queryParams = [], bodyParams = {}, moduleName) => {
    const bodyPrms = (_getBodyParam(bodyParams || {}));
    SwaggerDoc.paths = {
        ...SwaggerDoc.paths,
        [path]: {
            ...SwaggerDoc.paths[path],
            [method]: {
                consumes: consumes,
                description: info,
                summary: info,
                parameters: [...(_getQueryParam(queryParams || [])), ...(bodyPrms ? [bodyPrms] : [])],
                produces: produces,
                tags: [moduleName],
                responses: {
                    200: {
                        type: "object",
                        description: "Successfull Operation",
                        properties: {
                            success: {
                                type: "string",
                            },
                            data: {
                                type: "object"
                            },
                            error: {
                                type: "object"
                            }
                        }
                    }
                }
            }
        }
    }
}

const _getQueryParam = (obj) => {
    const schema = Object.keys(obj).reduce((prev, key) => {
        if (obj[key].isJoi) {
            prev.push({ name: key, type: obj[key]._type, in: "query", required: obj[key]._flags.presence === 'required' ? true : false })
        }
        return prev;
    }, []);
    return schema;
}

const _getBodyParam = (obj) => {
    if (Object.keys(obj).length) {
        const schema = Object.keys(obj).reduce((prev, key) => {
            if (obj[key].isJoi) {
                prev[key] = {  type: obj[key]._type, required: obj[key]._flags.presence === 'required' ? true : false }
            }
            return prev;
        }, {});
        return {
            description: "",
            in: "body",
            name: "body",
            type: "object",
            required: true,
            properties: schema
        }
    }
    return null;

}