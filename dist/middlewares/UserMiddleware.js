"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _errors = _interopRequireDefault(require("../model/errors"));

var _Response = _interopRequireDefault(require("../model/Response"));

var _UserServices = _interopRequireDefault(require("../services/UserServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkPasswordComplexity(pwd) {
  const letter = /[a-zA-Z]/;
  const number = /[0-9]/;
  const valid = number.test(pwd) && letter.test(pwd);
  return valid;
}
/* eslint-disable camelcase */


class UserMiddleware {
  static async validateSignUp(req, res, next) {
    try {
      // eslint-disable-next-line object-curly-newline
      const {
        first_name,
        last_name,
        email_address,
        is_admin,
        password
      } = req.body;

      if (!first_name) {
        throw new _errors.default(400, 'first_name is required');
      }

      if (!last_name) {
        throw new _errors.default(400, 'last_name is required');
      }

      if (!email_address) {
        throw new _errors.default(400, 'email_address is required');
      }

      if (!password) {
        throw new _errors.default(400, 'password is required');
      }

      if (typeof first_name !== 'string') {
        throw new _errors.default(400, 'first_name should be a string');
      }

      if (typeof last_name !== 'string') {
        throw new _errors.default(400, 'last_name should be a string');
      }

      if (typeof email_address !== 'string') {
        throw new _errors.default(400, 'email_address should be a string');
      }

      if ((await _UserServices.default.findUserByEmail(email_address).length) !== 0) {
        throw new _errors.default(400, 'email_address already in use');
      }

      if (typeof is_admin !== 'boolean') {
        throw new _errors.default(400, 'admin should be boolean');
      }

      if (typeof password !== 'string') {
        throw new _errors.default(400, 'Password must be a field');
      }

      if (checkPasswordComplexity(password) === false) {
        throw new _errors.default(400, 'passwords only accepts aplha numeric characters');
      }

      next();
    } catch (error) {
      res.status(error.statusCode || 500).json(new _Response.default(false, error.statusCode || 500, error.message));
    }
  }

  static async validateSignIn(req, res, next) {
    try {
      // eslint-disable-next-line object-curly-newline
      const {
        first_name,
        last_name,
        email_address,
        is_admin,
        password
      } = req.body;

      if (!first_name) {
        throw new _errors.default(400, 'first_name is required');
      }

      if (!last_name) {
        throw new _errors.default(400, 'last_name is required');
      }

      if (!email_address) {
        throw new _errors.default(400, 'email_address is required');
      }

      if (!password) {
        throw new _errors.default(400, 'password is required');
      }

      if (typeof first_name !== 'string') {
        throw new _errors.default(400, 'first_name should be a string');
      }

      if (typeof last_name !== 'string') {
        throw new _errors.default(400, 'last_name should be a string');
      }

      if (typeof email_address !== 'string') {
        throw new _errors.default(400, 'email_address should be a string');
      }

      console.log('test');

      if ((await _UserServices.default.findUserByEmail(email_address).length) !== 0) {
        console.log('test');
        console.log((await _UserServices.default.findUserByEmail(email_address)));
        throw new _errors.default(400, 'email_address already in use');
      }

      if (typeof is_admin !== 'boolean') {
        throw new _errors.default(400, 'admin should be boolean');
      }

      if (typeof password !== 'string') {
        throw new _errors.default(400, 'Password must be a field');
      }

      if (checkPasswordComplexity(password) === false) {
        throw new _errors.default(400, 'passwords only accepts aplha numeric characters');
      }

      next();
    } catch (error) {
      res.status(error.statusCode || 500).json(new _Response.default(false, error.statusCode || 500, error.message));
    }
  }

}

exports.default = UserMiddleware;