"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _UserServices = _interopRequireDefault(require("./services/UserServices"));

var _Response = _interopRequireDefault(require("./model/Response"));

var _UserRouter = _interopRequireDefault(require("./routes/UserRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use('/api/v1', _UserRouter.default);
app.use('*', (req, res) => {
  res.status(404).json(new _Response.default(false, 404, 'URL not found'));
});
const PORT = process.env.PORT || 3000; // eslint-disable-next-line no-console

app.listen(PORT, () => console.log(`app open on port: ${PORT}`));
var _default = app;
exports.default = _default;