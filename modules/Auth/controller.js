const AuthModel = require('./model');
const { ErrorHandler } = require('../../utils')

module.exports = new class {

    async login(req,res, next){
        throw ErrorHandler.UnhandledError();
    }


}