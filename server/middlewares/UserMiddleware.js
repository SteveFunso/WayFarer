import APIError from '../model/errors';
import Response from '../model/Response';
import UserServices from '../services/UserServices';

function checkPasswordComplexity(pwd) {
  const letter = /[a-zA-Z]/;
  const number = /[0-9]/;
  const valid = number.test(pwd) && letter.test(pwd);
  return valid;
}


/* eslint-disable camelcase */
export default class UserMiddleware {
  static async validateSignUp(req, res, next) {
    try {
      // eslint-disable-next-line object-curly-newline
      const { first_name, last_name, email_address, is_admin, password } = req.body;
      if (!first_name) {
        throw new APIError(400, 'first_name is required');
      }
      if (!last_name) {
        throw new APIError(400, 'last_name is required');
      }
      if (!email_address) {
        throw new APIError(400, 'email_address is required');
      }
      if (!password) {
        throw new APIError(400, 'password is required');
      }
      if (typeof first_name !== 'string') {
        throw new APIError(400, 'first_name should be a string');
      }
      if (typeof last_name !== 'string') {
        throw new APIError(400, 'last_name should be a string');
      }
      const user = await UserServices.findUserByEmail(req.body.email_address);
      if (typeof email_address !== 'string') {
        throw new APIError(400, 'email_address should be a string');
      }
      if (user.length > 0) {
        throw new APIError(400, 'email_address already exists');
      }
      if (typeof is_admin !== 'boolean') {
        throw new APIError(400, 'admin should be boolean');
      }
      if (typeof password !== 'string') {
        throw new APIError(400, 'Password must be a field');
      }
      if (checkPasswordComplexity(password) === false) {
        throw new APIError(400, 'passwords only accepts aplha numeric characters');
      }
      next();
    } catch (error) {
      res.status(error.statusCode || 500).json(
        new Response(false, error.statusCode || 500, error.message),
      );
    }
  }

  static async validateSignIn(req, res, next) {
    try {
      // eslint-disable-next-line object-curly-newline
      const { email_address, password } = req.body;
      if (!email_address) {
        throw new APIError(400, 'email_address is required');
      }
      if (!password) {
        throw new APIError(400, 'password is required');
      }
      if (typeof email_address !== 'string') {
        throw new APIError(400, 'email_address should be a string');
      }
      if (typeof password !== 'string') {
        throw new APIError(400, 'Password must be a field');
      }
      if (checkPasswordComplexity(password) === false) {
        throw new APIError(400, 'passwords only accepts aplha numeric characters');
      } const user = await UserServices.findUserByEmail(req.body.email_address);
      if (user.length === 0) {
        throw new APIError(400, 'email address does not exists');
      }
      next();
    } catch (error) {
      res.status(error.statusCode || 500).json(
        new Response(false, error.statusCode || 500, error.message),
      );
    }
  }
}
