import express from 'express';
const userRouter = express.Router();
import { UpdatePassword, getAllUsers } from '../controllers/userController';
import { AuthCheck } from '../middlewares/protect';

userRouter.use(AuthCheck);
userRouter.route('/updatePassword').post(UpdatePassword);
userRouter.route('/').get(getAllUsers);

export default userRouter;
