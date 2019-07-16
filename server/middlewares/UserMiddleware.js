import APIError from '../model/errors';
import Response from '../model/Response';
import UserServices from '../services/UserServices';


/* eslint-disable camelcase */
export default class UserMiddleware {
  // static async validateSignUp(req, res, next) {
  //   try {
  //     // eslint-disable-next-line object-curly-newline
  //     const { first_name, last_name, email_address, is_admin, password } = req.body;
  //     if (!first_name) {
  //       throw new APIError(400, 'first_name is required');
  //     }
  //     if (!last_name) {
  //       throw new APIError(400, 'last_name is required');
  //     }
  //     if (!email_address) {
  //       throw new APIError(400, 'email_address is required');
  //     }
  //     if (!password) {
  //       throw new APIError(400, 'password is required');
  //     }
  //     if (typeof first_name !== 'string') {
  //       throw new APIError(400, 'first_name should be a string');
  //     }
  //     if (typeof last_name !== 'string') {
  //       throw new APIError(400, 'last_name should be a string');
  //     }
  //     const user = await UserServices.findUserByEmail(req.body.email_address);
  //     if (typeof email_address !== 'string') {
  //       throw new APIError(400, 'email_address should be a string');
  //     }
  //     if (user.length > 0) {
  //       throw new APIError(400, 'email_address already exists');
  //     }
  //     if (typeof is_admin !== 'boolean') {
  //       throw new APIError(400, 'admin should be boolean');
  //     }
  //     if (typeof password !== 'string') {
  //       throw new APIError(400, 'Password must be a field');
  //     }
  //     if (checkPasswordComplexity(password) === false) {
  //       throw new APIError(400, 'passwords only accepts aplha numeric characters');
  //     }
  //     next();
  //   } catch (error) {
  //     res.status(error.statusCode || 500).json(
  //       new Response(false, error.statusCode || 500, error.message),
  //     );
  //   }
  // }

  static async validateSignUp(req, res, next) {
    try {
      // eslint-disable-next-line object-curly-newline
      const { first_name, last_name, email, password } = req.body;
      if (!first_name) {
        throw new APIError(400, 'first_name is required');
      }
      if (!last_name) {
        throw new APIError(400, 'last_name is required');
      }
      if (!email) {
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
      const user = await UserServices.findUserByEmail(req.body.email);
      if (typeof email !== 'string') {
        throw new APIError(400, 'email_address should be a string');
      }
      if (user.length > 0) {
        throw new APIError(400, 'email_address already exists');
      }
      if (typeof password !== 'string') {
        throw new APIError(400, 'Password must be a field');
      }
      req.body.email_address = email;
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
      const { email, password } = req.body;
      if (!email) {
        throw new APIError(400, 'email_address is required');
      }
      if (!password) {
        throw new APIError(400, 'password is required');
      }
      if (typeof email !== 'string') {
        throw new APIError(400, 'email_address should be a string');
      }
      if (typeof password !== 'string') {
        throw new APIError(400, 'Password must be a field');
      }
      const user = await UserServices.findUserByEmail(req.body.email);
      if (user.length === 0) {
        throw new APIError(400, 'email address does not exists');
      }
      req.body.email_address = email;
      next();
    } catch (error) {
      res.status(error.statusCode || 500).json(
        new Response(false, error.statusCode || 500, error.message),
      );
    }
  }

  static async createBooking(req, res) {
    console.log(req.body);
    try {
      const booking = await UserServices.createBooking(req.body);
      booking.id = booking.booking_id;
      delete booking.booking_id;
      res.status(201).json(new Response(true, 201, booking));
    } catch (error) {
      console.log(error.message);
      res.status(error.statusCode || 500).json(
        new Response(false, error.statusCode || 500, error.message),
      );
    }
  }

  static async checkIsAdmin(req, res, next) {
    try {
      // console.log(await req.body.verifiedUser);
      if (await req.body.verifiedUser.is_admin !== true) {
        throw new APIError(400, 'Only an Admin can cancel a trip');
      }
      next();
    } catch (error) {
      res.status(error.statusCode || 500).json(
        new Response(false, error.statusCode || 500, error.message),
      );
    }
  }

  static async validateCreateBooking(req, res, next) {
    try {
console.log(req.body)
      // eslint-disable-next-line object-curly-newline
      const { user_id, trip_id } = req.body;
      if (!user_id) {
        throw new APIError(400, 'User Id is required');
      }
      if (!trip_id) {
        throw new APIError(400, 'Trip Id is required');
      }
      next();
    } catch (error) {
console.log(error.message)
      res.status(error.statusCode || 500).json(
        new Response(false, error.statusCode || 500, error.message),
      );
    }
  }
}
