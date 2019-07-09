"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = require("pg");

const pool = new _pg.Pool({
  connectionString: process.env.DATABASE_URL
});
const client = pool.connect();
var _default = {
  connect(query, params) {
    return new Promise((resolve, reject) => {
      pool.query(query, params).then(res => resolve(res.rows)).catch(err => reject(err));
    });
  }

};
exports.default = _default;