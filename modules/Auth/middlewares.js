const { ErrorHandler } = require('../../utils');

exports.Authentication = async (req, res, next)=>{
    const token = (req.headers.authorization || req.headers.Authorization);
    if(token){
        next();
    }
    // else return { data: [] }
    else throw ErrorHandler.UnAuthorizedAccess();
}

