const bodyParser = require('body-parser');
const SwaggerDoc = require('./swagger');
const SwaggerUI = require('swagger-ui-express');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

exports.init = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended:true, limit:'5mb' }));
    app.use(helmet());    
}

exports.initializeSwaggerExplorer = (app)=>{
    app.use('/explorer', SwaggerUI.serve, SwaggerUI.setup(SwaggerDoc));
}