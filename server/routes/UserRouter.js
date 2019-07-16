import express from 'express';
import UserController from '../controllers/UsersController';
import UserMiddleware from '../middlewares/UserMiddleware';
import TokenMiddleWare from '../middlewares/TokenMiddleware';

const userRouter = express.Router();

userRouter.post('/auth/signup', UserController.signUp);
userRouter.post('/auth/signin', UserController.signIn);
userRouter.post('/trips', TokenMiddleWare.validateToken, UserMiddleware.validateCreateTrip, UserController.createTrip);
userRouter.patch('/trips/:tripId', TokenMiddleWare.validateToken, UserMiddleware.checkIsAdmin, UserController.cancleTrip);
userRouter.get('/trips', TokenMiddleWare.validateToken, UserController.getAllTrips);
userRouter.post('/bookings', TokenMiddleWare.validateToken, UserMiddleware.validateCreateBooking, UserController.createBooking);
userRouter.delete('/bookings/:bookingId', TokenMiddleWare.validateToken, UserController.deleteBookings);
userRouter.get('/bookings', TokenMiddleWare.validateToken, UserController.getBookings);
export default userRouter;
