import express from 'express';
import swaggerUI from 'swagger-ui-express';
import UserController from '../controllers/UsersController';
import UserMiddleware from '../middlewares/UserMiddleware';
import TokenMiddleWare from '../middlewares/TokenMiddleware';
import swaggerDoc from '../doc/Swagger';


const userRouter = express.Router();
userRouter.use('/', swaggerUI.serve);
userRouter.get('/', swaggerUI.setup(swaggerDoc));

// userRouter.get('/', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
userRouter.post('/auth/signup', UserMiddleware.validateSignUp, UserController.signUp);
userRouter.post('/auth/signin', UserMiddleware.validateSignIn, UserController.signIn);
userRouter.post('/trips', TokenMiddleWare.validateToken, UserMiddleware.validateCreateTrip, UserController.createTrip);
// userRouter.patch('/trips/:tripId', TokenMiddleWare.validateToken, UserMiddleware.checkIsAdmin, UserController.cancleTrip);
userRouter.patch('/trips/:tripId', TokenMiddleWare.validateToken, /* UserMiddleware.checkIsAdmin,*/ UserController.cancleTrip);
userRouter.get('/trips', TokenMiddleWare.validateToken, UserController.getAllTrips);
userRouter.post('/bookings', TokenMiddleWare.validateToken, UserMiddleware.validateCreateBooking, UserController.createBooking);
userRouter.delete('/bookings/:bookingId', TokenMiddleWare.validateToken, UserController.deleteBookings);
userRouter.get('/bookings', TokenMiddleWare.validateToken, UserController.getBookings);
export default userRouter;
