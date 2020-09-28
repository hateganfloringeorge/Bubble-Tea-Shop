class ServerError extends Error { // clasa de erori definita custom
  constructor(message, httpStatus) {
    super(message);
    this.name = this.constructor.name;
    this.httpStatus = httpStatus;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  ServerError,
};
