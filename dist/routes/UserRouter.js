"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

var _UserMiddleware = _interopRequireDefault(require("../middlewares/UserMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userRouter = _express.default.Router();

userRouter.post('/auth/signup', _UserMiddleware.default.validateSignUp, _UsersController.default.signUp); //userRouter.get('/auth/signin', UserMiddleware.validateSignIn, UserController.signIn);

var _default = userRouter;
exports.default = _default;