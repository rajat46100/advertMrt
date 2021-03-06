const BaseModel = require('../../utils/base-model');

module.exports = new (class extends BaseModel {
  constructor() {
    super();
  }

  static getSchema() {
    return {
      mobileNumber: { type: String, required: true },
      name: { type: String, default: 'New User' },
      city: { type: String, default: '' },
      purpose: { type: Number, default: 1 },
      infoUpdated: { type: Boolean, default: false }
    };
  }

  static getModelName() {
    return 'User';
  }
})();
