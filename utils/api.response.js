class APIResponse {
  constructor(error = null, data = null, time = null) {
    this.error = error;
    this.data = data;
    this.success = error ? false : true;
  }

  static SendError(error) {
    return new APIResponse(error);
  }

  static SendSuccess(data) {
    return new APIResponse(null, data);
  }
}

module.exports = APIResponse;
