import pool from './index';


export default class UserService {
  static async createUser(body) {
    const query = 'INSERT INTO "Users" (first_name, last_name, email_address, is_admin, password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const user = await pool.connect(query, [body.first_name, body.last_name,
      body.email_address, body.is_admin, body.password]);
    return user[0];
  }

  // PLEASE DON'T TOUCH THIS
  static async findUserByEmail(email) {
    const query = 'SELECT * FROM "Users" WHERE email_address = $1';
    const user = await pool.connect(query, [email]);
    return user;
  }

  // PLEASE DON'T TOUCH THIS
  static async findUserByPass(pass) {
    const query = 'SELECT * FROM "Users" WHERE password = $1';
    const user = await pool.connect(query, [pass]);
    return user;
  }


  // PLEASE DON'T TOUCH THIS
  static async checkUser(userId) {
    const query = 'SELECT * FROM "Users" WHERE user_id = $1';
    const user = await pool.connect(query, [userId]);
    if (user[0].is_admin === true) {
      return true;
    }
    return false;
  }

  static async createTrip(body) {
    const query = 'INSERT INTO "Trips" ( bus_id, origin, destination, trip_date,fare,status,trip_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const trip = await pool.connect(query, [body.bus_id, body.origin,
      body.destination, body.trip_date, body.fare, body.status, body.trip_id]);
    return trip[0];
  }

  static async cancleTrip(tripId) {
    const query = 'Delete FROM "Trips" WHERE trip_id = $1';
    await pool.connect(query, [tripId]);
  }

  static async getAllTrips() {
    const query = 'SELECT  bus_id, origin, destination, trip_date,fare,status,trip_id FROM "Trips"';
    const allTrips = await pool.connect(query);
    return allTrips;
  }

  static async createBooking(body) {
    const query = 'INSERT INTO "Bookings" ( user_id, trip_id) VALUES ($1, $2) RETURNING *';
    const bookings = await pool.connect(query, [body.user_id, body.trip_id]);
    return bookings[0];
  }

  static async deleteBooking(bookingId) {
    const query = 'Delete FROM "Bookings" WHERE booking_id = $1';
    await pool.connect(query, [bookingId]);
  }

  static async getAllBookings() {
    const query = 'SELECT  booking_id, user_Id, trip_id FROM "Bookings"';
    const bookings = await pool.connect(query);
    return bookings;
  }

  static async getBookingsForUser(userId) {
    const query = 'SELECT  booking_id, user_Id, trip_id FROM "Bookings" WHERE user_id = $1';
    const booking = await pool.connect(query, [userId]);
    return booking;
  }
}
