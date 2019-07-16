/* eslint-disable comma-dangle */
import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import UserService from '../services/UserServices';
import Response from '../model/Response';
import APIError from '../model/errors';
import TokenMiddleWare from '../middlewares/TokenMiddleware';


export default class UserController {
  static async signUp(req, res) {
    try {
      const pass = req.body.password;
      const password = hashSync(pass, genSaltSync(11));
      req.body.password = password;
      const user = await UserService.createUser(req.body);
      user.token = TokenMiddleWare.generateToken(user.email_address, user.user_id); // made a change
      delete user.password; // made a change
      res.status(201).json(new Response(true, 201, user));
    } catch (error) {
      res.status(error.statusCode || 500).json(
        new Response(false, error.statusCode || 500, error.message)
      );
    }
  }

  static async signIn(req, res) {
    console.log(req.body);
    try {
      const { body } = req;
      const user = await UserService.findUserByEmail(req.body.email_address);
      if (user.length < 1) {
        throw new APIError(404, 'The email is not associated with any user');
      }
      if (compareSync(body.password, user[0].password)) {
        const token = TokenMiddleWare.generateToken(user.email_address, user.user_id);
        user[0].token = token;
        delete user[0].password;
        console.log(req.body);
        res.status(200).json(new Response(true, 200, (user[0])));
      } else {
        console.log(req.body);
        res.status(401).json(new Response(false, 401, 'The password is incorrect'));
      }
    } catch (error) {
      console.log(req.body);
      res.status(error.statusCode || 500).json(
        new Response(false, error.statusCode || 500, error.message)
      );
    }
  }

  static async createTrip(req, res) {
    try {
      const trip = await UserService.createTrip(req.body);
      res.status(201).json(new Response(true, 201, trip));
    } catch (error) {
      res.status(error.statusCode || 500).json(
        new Response(false, error.statusCode || 500, error.message)
      );
    }
  }

  static async cancleTrip(req, res) {
    try {
      await UserService.cancleTrip(req.body.trip_id);
      const message = 'Trip cancelled successfully';
      res.status(200).json(new Response(true, 200, message));
    } catch (error) {
      res.status(error.statusCode || 500).json(
        new Response(false, error.statusCode || 500, error.message)
      );
    }
  }

  static async getAllTrips(req, res) {
    try {
      const allTrips = await UserService.getAllTrips();
      res.status(200).json(new Response(true, 200, allTrips));
    } catch (error) {
      res.status(error.statusCode || 500).json(
        new Response(false, error.statusCode || 500, error.message)
      );
    }
  }

  static async createBooking(req, res) {
    try {
      const booking = await UserService.createBooking(req.body);
      res.status(201).json(new Response(true, 201, booking));
    } catch (error) {
      res.status(error.statusCode || 500).json(
        new Response(false, error.statusCode || 500, error.message)
      );
    }
  }

  static async deleteBookings(req, res) {
    try {
      await UserService.deleteBooking(req.body.booking_id);
      const message = 'Booking deleted successfully';
      res.status(200).json(new Response(true, 200, message));
    } catch (error) {
      res.status(error.statusCode || 500).json(
        new Response(false, error.statusCode || 500, error.message)
      );
    }
  }

  static async getBookings(req, res) {
    let booking;
    try {
      if (await req.body.verifiedUser.is_admin === true) {
        booking = await UserService.getAllBookings(req.body);
      } else {
        booking = await UserService.getBookingsForUser(req.body.user_id);
      }
      res.status(200).json(new Response(true, 200, booking));
    } catch (error) {
      res.status(error.statusCode || 500).json(
        new Response(false, error.statusCode || 500, error.message)
      );
    }
  }
}
