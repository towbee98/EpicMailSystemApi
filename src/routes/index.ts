import express from 'express';
const router = express.Router();
import authRouter from './auth';
import userRouter from './users';
import messageRouter from './messages';

router.use('/auth', authRouter);
router.use('/messages', messageRouter);
router.use('/users', userRouter);

export default router;
