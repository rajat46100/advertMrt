const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const AuthModel = require('./model');
const { ErrorHandler } = require('../../utils')

var cryptoJs = require('crypto-js');

function hash(username, password) {
    var rawStr = (username || '').toLowerCase() + password;
    var utf8Array = cryptoJs.enc.Utf8.parse(rawStr);
    var hashArray = cryptoJs.SHA256(utf8Array);
    var hashedBase64Str = cryptoJs.enc.Base64.stringify(hashArray);
    return hashedBase64Str;
}

const localLogin = new LocalStrategy({
    usernameField: 'email',
    passwordField:'password'
}, async (username, password, done)=>{
    let user = await AuthModel.findOne({ email: username, password: hash(username,password)  });
    if(!user){
      return done(ErrorHandler.InvalidCredentials('Invalid email or password'));
    }
    return done(null, user);
});

passport.use(localLogin);
passport.initialize();

exports.passport = passport;
exports.hash = hash;