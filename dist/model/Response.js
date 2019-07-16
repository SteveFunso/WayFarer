"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Response {
  constructor(success, statusCode, message) {
    this.statusCode = statusCode;

    if (success) {
      this.data = message;
    } else {
      this.error = message;
    }
  }

}

exports.default = Response;