const BaseModel = require('../../utils/base-model');

module.exports = new (class extends BaseModel {
  constructor() {
    super();
  }

  static getSchema() {
    return {
      mobileNumber: { type: String, required: true },
      otp: { type: String, required: true },
      verified: { type: Boolean, default: false }
    };
  }

  static getModelName() {
    return 'OtpVerification';
  }
})();
