import express from 'express';
const authRouter = express.Router();
import {
  LoginController,
  SignUpController,
  verifyUser,
  forgetPassword,
  resetPassword,
} from '../controllers/authController';
import {
  validatePayload,
  validateForgetPasswordPayload,
  validateResetPasswordPayload,
} from '../middlewares/validate';

authRouter.route('/login').post(LoginController);

authRouter.route('/signup').post(validatePayload, SignUpController);
authRouter.route('/:confirmCode').get(verifyUser);
authRouter
  .route('/forgetPassword')
  .post(validateForgetPasswordPayload, forgetPassword);
authRouter
  .route('/resetPassword/:userId/:resetToken')
  .post(validateResetPasswordPayload, resetPassword);
export default authRouter;
