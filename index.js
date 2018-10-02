const express = require('express');
const middlewares = require('./utils/middlewares');
const modules = require('./modules');
const config = require('config');
const morgan = require('morgan');

const app = express();

middlewares.init(app);

modules.init(app);

middlewares.initializeSwaggerExplorer(app);

app.use(morgan('common'));

app.listen(config.port, ()=>{
    console.log(`Application is listening on http://${config.host}:${config.port}`);
    console.log(`Explorer available at http://${config.host}:${config.port}/explorer`);
});