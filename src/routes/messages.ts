import express from 'express';
const messageRouter = express.Router();

import {
  sendMessage,
  getAllInbox,
  getInboxMessage,
  addToDrafts,
  getAllDrafts,
  getDraft,
  sendDraftMessage,
  editDraftMessage,
  fetchSentMessages,
  fetchSentMessage,
  retractMessage,
  deleteDraftMessage,
} from '../controllers/message.controller';
import { AuthCheck } from '../middlewares/protect';

messageRouter.use(AuthCheck);
messageRouter.route('/inbox').get(getAllInbox);
messageRouter.route('/inbox/:messageId').get(getInboxMessage);
messageRouter.route('/drafts').get(getAllDrafts).post(addToDrafts);
messageRouter
  .route('/drafts/:messageId')
  .get(getDraft)
  .post(sendDraftMessage)
  .patch(editDraftMessage)
  .delete(deleteDraftMessage);
messageRouter.route('/sent').get(fetchSentMessages);
messageRouter.route('/sent/:messageId').get(fetchSentMessage);
messageRouter.route('/sent/:messageId/retract').patch(retractMessage);
messageRouter.route('/').post(sendMessage);

export default messageRouter;
