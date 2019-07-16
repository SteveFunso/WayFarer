import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import UserService from '../services/UserServices';
import Response from '../model/Response';
import APIError from '../model/errors';
import TokenMiddleWare from '../middlewares/TokenMiddleware';


export default class UserController {
  static async signUp(req, res) {
    const pass = req.body.password;
    const password = hashSync(pass, genSaltSync(11));
    req.body.password = password;
    const user = await UserService.createUser(req.body);
    user.token = TokenMiddleWare.generateToken(user.email_address, user.user_id); // made a change
    delete user.password; // made a change
    res.status(201).json(new Response(true, 201, user));
  }

  static async signIn(req, res) {
    const { body } = req;
    const user = await UserService.findUserByEmail(req.body.email_address);
    if (user.length < 1) {
      throw new APIError(404, 'The email is not associated with any user');
    }
    if (compareSync(body.password, user[0].password)) {
      const token = TokenMiddleWare.generateToken(user.email_address, user.user_id);
      user[0].token = token;
      delete user[0].password;
      res.status(200).json(new Response(true, 200, (user[0])));
    } else {
      res.status(401).json(new Response(false, 401, 'The password is incorrect'));
    }
  }
}
