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

  static async validateSignIn(req, res, next) {
    try {
      console.log(req.body);
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
        new Response(false, error.statusCode || 500, error.message)
);
    }
  }


  static async validateCreateTrip(req, res, next) {
    try {
      console.log(req.body);
      // eslint-disable-next-line object-curly-newline
      const { bus_id, origin, destination, trip_date, fare, status, trip_id } = req.body;
      if (!bus_id) {
        throw new APIError(400, 'Bus_id is required');
      }
      if (!origin) {
        throw new APIError(400, 'Origin is required');
      }
      if (!destination) {
        throw new APIError(400, 'Destination is required');
      }
      if (!trip_date) {
        throw new APIError(400, 'Trip Date is required');
      }
      if (!fare) {
        throw new APIError(400, 'Fare is required');
      }
      if (!status) {
        throw new APIError(400, 'Status is required');
      }
      if (!trip_id) {
        throw new APIError(400, 'Trip Id is required');
      }
      if (typeof bus_id !== 'number') {
        throw new APIError(400, 'bus id should be a string');
      }
      if (typeof origin !== 'string') {
        throw new APIError(400, 'origin should be a string');
      }
      if (typeof destination !== 'string') {
        throw new APIError(400, 'destination should be a string');
      }
      if (Object.prototype.toString.call(trip_date) === '[object Date]') {
        throw new APIError(400, 'Trip Date should be a proper date format ');
      }
      if (typeof fare !== 'number') {
        throw new APIError(400, 'Trip fare should be a number');
      }
      if (typeof status !== 'string') {
        throw new APIError(400, 'status should be a string');
      }
      if (typeof trip_id !== 'number') {
        throw new APIError(400, 'Trip Id should be a number');
      }

      next();
    } catch (error) {
      res.status(error.statusCode || 500).json(
        new Response(false, error.statusCode || 500, error.message),
      );
    }
  }

  static async checkIsAdmin(req, res, next) {
    try {
      console.log(await req.body.verifiedUser);
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
      res.status(error.statusCode || 500).json(
        new Response(false, error.statusCode || 500, error.message),
      );
    }
  }
}
