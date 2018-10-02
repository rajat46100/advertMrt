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

    

    

}

module.exports = ErrorHandler;
