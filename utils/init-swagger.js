const SwaggerDoc = require('./swagger');
const APIResponse = require('./api.response');

exports.addSwaggerPath = (path, method, info, consumes, produces, queryParams = [], bodyParams = {}, moduleName, auth) => {
    const { str, found } = _repl(path);
    console.log({found});
    path = str;
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
                ...(auth ? { security: [{
                    api_key:[]
                }] } : {}),
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
            properties: schema
        }
    }
    return null;

}

function replaceAt(name, index, repl) {
       name = name.split(""); name.splice(index, 0, repl); name = name.join(""); return name 
}
   
function _repl(str, found = []) {
   var regex = /{([^}]+)}/g;
   var curMatch;
   
	   let index = str.indexOf(':');
	   if(index !== -1) {
		   str = str.replace(':', '{')
		   let nextcolon = str.substring(index, str.length).indexOf('/');
		   if (nextcolon!=-1) {
            index = index+nextcolon;
            str = replaceAt(str, index, '}');
            while (curMatch = regex.exec(str)) {
                found.push(curMatch[1]);
            }
            return _repl(str, found);
        }
		   else {
		   str = str.concat('}');
			   while (curMatch = regex.exec(str)) {
				   found.push(curMatch[1]);
			   }
			   return {str,found}
		   };
	   }
	   return { str, found };
}