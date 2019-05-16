const AuthModel = require('./model');
const { ErrorHandler } = require('../../utils');
const { passport, hash } = require('./passport-strategies');

module.exports = new (class {
  login(Strategy) {
    return (req, res, next) => {
      return new Promise((resolve, reject) => {
        passport.authenticate(Strategy, (error, user, info) => {
          if (error) {
            return reject(error);
          }
          // token
          return next();
        })(req, res, next);
      });
    };
  }

  async register(req, res, next) {
    const user = { name: this.bodyParams.name };
    response.created(user);
  }

  async forgotPassword(req, res, next) {
    const user = await AuthModel.findOne({ email: req.query.email });
    if (user) {
      const hashedLink = user.password;
      // sendMail();
    }
  }
})();
