const BaseModel = require('../../utils/base-model');

class AuthModel extends BaseModel{

    constructor(){
        super();
    }


    static getSchema(){
        return{
            username: { type:String, required:true },
            password:{ type:String, required: true }
        }
    }

    static getModelName(){ 
        return 'User' 
    };




}


module.exports = new AuthModel();
