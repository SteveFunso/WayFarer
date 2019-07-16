import express from 'express';
import UserController from '../controllers/UsersController';
import UserMiddleware from '../middlewares/UserMiddleware';
import TokenMiddleWare from '../middlewares/TokenMiddleware';

const userRouter = express.Router();
userRouter.post('/auth/signup', UserMiddleware.validateSignUp, UserController.signUp);
userRouter.post('/auth/signin', UserMiddleware.validateSignIn, UserController.signIn);
userRouter.post('/createtrip', TokenMiddleWare.validateToken, UserMiddleware.validateCreateTrip, UserController.createTrip);
userRouter.post('/canceltrip', TokenMiddleWare.validateToken, UserMiddleware.checkIsAdmin, UserController.cancleTrip);
export default userRouter;
