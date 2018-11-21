const BaseModel = require('../../utils/base-model');

module.exports = new class extends BaseModel{

    constructor(){
        super();
    }

    static getSchema(){
        return{
            email: { type:String, required:true },
            password:{ type:String, required: true }
        }
    }

    static getModelName(){ 
        return 'User' 
    };




}
