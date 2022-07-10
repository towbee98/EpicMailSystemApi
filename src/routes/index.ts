import express from 'express';
const router = express.Router();
import { AuthCheck } from '../middlewares/protect';
import authRouter from './auth';
import userRouter from './users';
import messageRouter from './messages';

router.use('/auth', authRouter);
router.use('/messages', [AuthCheck], messageRouter);
router.use('/users', [AuthCheck], userRouter);

export default router;
