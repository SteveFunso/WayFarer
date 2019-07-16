export default class Response {
  constructor(success, statusCode, message) {
    this.statusCode = statusCode;
    if (success) {
      this.data = message;
    } else {
      this.error = message;
    }
  }
}
