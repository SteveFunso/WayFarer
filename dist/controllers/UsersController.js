"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = require("bcrypt");

var _UserServices = _interopRequireDefault(require("../services/UserServices"));

var _Response = _interopRequireDefault(require("../model/Response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserController {
  static async signUp(req, res) {
    const pass = req.body.password;
    const password = (0, _bcrypt.hashSync)(pass, (0, _bcrypt.genSaltSync)(11));
    req.body.password = password;
    const user = await _UserServices.default.createUser(req.body);
    res.status(201).json(new _Response.default(true, 201, user));
  }

}

exports.default = UserController;