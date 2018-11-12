const express = require('express');
const middlewares = require('./utils/middlewares');
const modules = require('./modules');
const config = Object.assign(require('config'), process.env);

const morgan = require('morgan');

const app = express();

const baseApp = express();

app.use(config.basePath, baseApp);


middlewares.init(baseApp);

modules.init(baseApp);

middlewares.initializeSwaggerExplorer(app);

app.use(morgan('common'));


app.listen(config.port, ()=>{
    console.log(`Application is listening on http://${config.host}:${config.port}`);
    console.log(`Explorer available at http://${config.host}:${config.port}/explorer`);
});