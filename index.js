const express = require('express');
const middlewares = require('./utils/middlewares');
const config = Object.assign(require('config'), process.env);
const { Router, InitializeDb, logger } = require('./utils');
const { Authentication } = require('./modules/Auth/middlewares');
const morgan = require('morgan');

    InitializeDb();
    
    const app = express();

    const baseApp = express();
    
    Router.setAuthentication(Authentication);
    
    const modules = require('./modules');
    
    
    app.use(config.swagger.basePath, baseApp);
    
    
    middlewares.init(baseApp);
    
    modules.init(baseApp);
    
    middlewares.initializeSwaggerExplorer(app);
    
    app.use(morgan('common'));
    
    
    app.listen(config.swagger.port, ()=>{
        console.info(`Application is listening on http://${config.swagger.host}:${config.swagger.port}`);
        console.info(`Explorer available at http://${config.swagger.host}:${config.swagger.port}/explorer`);
    });

