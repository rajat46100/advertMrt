const Auth = require('./Auth');


exports.init = ( app )=>{
    Auth.mount(app);
}