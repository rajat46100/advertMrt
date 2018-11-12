const SwaggerDoc = require('./swagger');
const APIResponse = require('./api.response');

exports.addSwaggerPath = (path, method, info, consumes, produces, queryParams = [], bodyParams = {}, moduleName) => {
    const { str, found } = _repl(path);
    path = str + (found.length ? "/"+found.map(elm=> `{${elm}}`).join('/') : "");

    const bodyPrms = (_getBodyParam(bodyParams || {}));
    SwaggerDoc.paths = {
        ...SwaggerDoc.paths,
        [path]: {
            ...SwaggerDoc.paths[path],
            [method]: {
                consumes: consumes,
                description: info,
                summary: info,
                parameters: [...(_getQueryParam(queryParams || [])), ..._getPathParams(found), ...(bodyPrms ? [bodyPrms] : [])],
                produces: produces,
                tags: [moduleName],
                responses: {
                    200: {
                        type: "object",
                        description: "Successfull Operation",
                        properties: APIResponse.getResponseStructure()
                    }
                }
            }
        }
    }
}

const _getPathParams = (params)=>{
    return params.map(param=>({
        name:param,
        in:"path",
        type:"string"
    }));
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

function _repl(str, found = []) {
	let match = /(.+)(?:\/\:([a-zA-Z0-9]+)\/?)+/.exec(str);
	if(match){
		console.log(found);
		found.push(match[2]);
		return _repl(match[1], found);
	}
	return {str, found};

}