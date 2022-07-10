import express from 'express';
const userRouter = express.Router();
import { UpdatePassword } from '../controllers/userController';

userRouter.post('/updatePassword', UpdatePassword);

export default userRouter;
