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
}
