import { hashSync, genSaltSync } from 'bcrypt';
import UserService from '../services/UserServices';
import Response from '../model/Response';


export default class UserController {
  static async signUp(req, res) {
    const pass = req.body.password;
    const password = hashSync(pass, genSaltSync(11));
    req.body.password = password;
    const user = await UserService.createUser(req.body);
    res.status(201).json(new Response(true, 201, user));
  }
}
