import express from 'express';
const messageRouter = express.Router();
import { HomePage } from '../controllers/userController';
messageRouter.get('/', HomePage);

export default messageRouter;
