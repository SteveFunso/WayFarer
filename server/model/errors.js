

// eslint-disable-next-line space-before-blocks
export default class APIError extends Error{
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
