class ErrorHandler  {
    
    constructor(message, statusCode, type, stack = {}){
        this.message = message;
        this.statusCode = statusCode;
        this.type = type;
        this.stack = stack;
    }

    static ValidationError(message, stack = {}){
       return new ErrorHandler(message, 400, 'ValidationError', stack);
    }

    static UnhandledError(message = 'Some Error Has Occured. Please try after some time', stack=[]){
        return new ErrorHandler(message, 500, 'UnhandledError', stack);
    }

    static UnAuthorizedAccess(message = 'User is not authorized to use the system', stack={}){
        return new ErrorHandler(message, 400, 'Authentication', stack);
    }

    static InvalidCredentials(message = 'Invalid Credentials Supplied', stack= {}){
        return new ErrorHandler(message, 400, 'InvalidCredentials', stack);
    }

    static DataBaseConnectionError(message = "Error While Connecting to db", stack = {}){
        return new ErrorHandler(message, 500, "DbConnectionError", stack);
    }

    

}

module.exports = ErrorHandler;
