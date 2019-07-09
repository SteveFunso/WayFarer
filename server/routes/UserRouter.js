import express from 'express';
import UserController from '../controllers/UsersController';
import UserMiddleware from '../middlewares/UserMiddleware';


const userRouter = express.Router();
userRouter.post('/auth/signup', UserMiddleware.validateSignUp, UserController.signUp);
//userRouter.get('/auth/signin', UserMiddleware.validateSignIn, UserController.signIn);

export default userRouter;
