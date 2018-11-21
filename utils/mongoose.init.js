const mongoose = require('mongoose');
const config = require('config');
const ErrorHandler = require('./error-handler');

exports.InitializeDb = async ()=> {
    try{
        await mongoose.connect(config.mongo_url, {
            reconnectTries:3,
            useNewUrlParser:true
        });
        console.info("Connected With Database");
    }
    catch(err){
        console.error(err);
        throw ErrorHandler.DataBaseConnectionError("Error while connecting to db", err);
    }
    
}


