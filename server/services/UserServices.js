import pool from './index';


export default class UserService {
  static async createUser(body) {
    const query = 'INSERT INTO "Users" (first_name, last_name, email_address, is_admin, password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const user = await
    pool.connect(query, [body.first_name, body.last_name, 
      body.email_address, body.is_admin, body.password]);
    return user[0];
  }

  static async findUserByEmail(email) {
    const query = 'SELECT * FROM "Users" WHERE email_address = $1';
    const user = await pool.connect(query, [email]);
    return user;
  }
}
