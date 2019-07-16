import express from 'express';
import UserController from '../controllers/UsersController';
import UserMiddleware from '../middlewares/UserMiddleware';
import TokenMiddleWare from '../middlewares/TokenMiddleware';

const userRouter = express.Router();
try {
  userRouter.post('/auth/signup', UserController.signUp);
  userRouter.post('/auth/signin', UserMiddleware.validateSignIn, UserController.signIn);
  userRouter.post('/createtrip', TokenMiddleWare.validateToken, UserMiddleware.validateCreateTrip, UserController.createTrip);
  userRouter.post('/canceltrip', TokenMiddleWare.validateToken, UserMiddleware.checkIsAdmin, UserController.cancleTrip);
  userRouter.get('/gettrips', TokenMiddleWare.validateToken, UserController.getAllTrips);
  userRouter.post('/createbooking', TokenMiddleWare.validateToken, UserMiddleware.validateCreateBooking, UserController.createBooking);
  userRouter.post('/deletebooking', TokenMiddleWare.validateToken, UserController.deleteBookings);
  userRouter.get('/getbookings', TokenMiddleWare.validateToken, UserController.getBookings);
} catch (error) {
  console.log(error);
}
export default userRouter;
