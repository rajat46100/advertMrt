class APIResponse {

    constructor(error = null, data = null){
        this.error = error;
        this.data = data;
        this.success = error ? false : true;
        this.status = error ? error.statusCode || 500 : 200;  
    }

    static SendError(error){
        return new APIResponse(error);
    }

    static SendSuccess(data){
        return new APIResponse(null, data);
    }

    static getResponseStructure(){
        return {
            success: {
                type: "boolean",
            },
            data: {
                type: "object"
            },  
            error: {
                type: "object"
            },
            status:{
                type: "number"
            }
        }
    }
}

module.exports = APIResponse;