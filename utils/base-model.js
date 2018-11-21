const mongoose = require('mongoose');
const SwaggerDoc = require('./swagger');

class BaseModel {

    constructor(){
        this.schema =  new mongoose.Schema(this.constructor.getSchema());
        this.model = mongoose.model(this.constructor.getModelName(), this.schema);

        SwaggerDoc.definitions = { ...SwaggerDoc.definitions, [this.constructor.getModelName()]: this.schema.jsonSchema() }
    }


    find(query){
        this.model.find(query);
    }   
    
    findOne(query){
        this.model.findOne(query);
    }

    create(data){
        this.model.create(data);
    }

    

}

module.exports = BaseModel;