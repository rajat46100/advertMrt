const AuthModel = require('./model');
const OtpVerificationModel = require('./otp-verification.model');
const { sendOTP } = require('../../services/message-service');
const { ErrorHandler } = require('../../utils');
const { createToken } = require('./token-handler');

module.exports = new (class {
  async sendOtp() {
    const mobileNumber = this.bodyParams.mobileNumber;
    const otp = _generateOTP(4);
    await OtpVerificationModel.create({ mobileNumber, otp });
    await sendOTP({ from: '+14134857731', to: mobileNumber, otp });
    return this.response.ok({ otpSent: true });
  }

  async verifyOTP() {
    const { mobileNumber, otp } = this.bodyParams;
    const record = OtpVerificationModel.findOne({ mobileNumber, otp, verified: false });
    if (record) {
      const user = await AuthModel.findOneOrCreate({ mobileNumber }, { mobileNumber });
      const token = createToken(user);
      return this.response.ok({ accessToken: token });
    }
    return this.response.badRequest(ErrorHandler.InvalidCredentials('Invalid Mobile Number or OTP entered'));
  }

  async updateProfile(req) {
    const userData = this.bodyParams;
    const user = await AuthModel.update({ _id: req.user._id }, { ...userData, infoUpdated: true });
    if (user) {
      const token = createToken(user);
      return this.response.ok({ accessToken: token });
    }
    throw ErrorHandler.UnhandledError();
  }
})();

function _generateOTP(length) {
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
