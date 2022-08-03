import { Request, Response, NextFunction } from 'express';
import { messageInterface } from '../models/message';
import { UserInterface } from '../models/user';
import {
  createMessage,
  getInbox,
  getAllInboxMessage,
  updateDraft,
  getAllDraftMessages,
  getDraftMessage,
  getAllSentMessages,
  getSentMessage,
  retractSentMessage,
  deleteMessage,
} from '../repository/message';
import { FindUser } from '../repository/user';
import { CreateError } from '../utils/ErrorClass';

interface CustomRequest extends Request {
  user: UserInterface;
}

const getAllInbox = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const inboxMessages = await getAllInboxMessage(
      (req as CustomRequest).user.username,
    );
    res.status(200).json({
      status: 'success',
      inboxMessages,
      message: 'Inbox feteched successfully',
    });
  } catch (error) {
    next(error);
  }
};

const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (
      !(await FindUser({ username: new RegExp(`\\b${req.body.to}\\b`, 'i') }))
    )
      return next(new CreateError('User not found', 400));
    const { to, title, content } = req.body;
    const message: messageInterface = {
      to,
      title,
      content,
      from: (req as CustomRequest).user.username,
      retracted: false,
      status: 'sent',
    };
    const sentMessage = await createMessage(message);
    res.status(200).json({
      status: 'success',
      sentMessage: sentMessage,
      message: 'Message was sent successfully',
    });
  } catch (error) {
    next(error);
  }
};
const getInboxMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const inboxMessage = await getInbox({
      id: req.params.messageId,
      to: (req as CustomRequest).user.username,
    });
    res.status(200).json({
      message: 'Inbox fetched successfully',
      inboxMessage,
    });
  } catch (error) {
    next(error);
  }
};
const addToDrafts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { to, title, content } = req.body;
    const draftMessage = await createMessage({
      from: (req as CustomRequest).user.username,
      status: 'draft',
      retracted: false,
      to,
      title,
      content,
    });
    res.status(200).json({
      message: 'message added to draft successfully',
      draftMessage,
    });
  } catch (error) {
    next(error);
  }
};

const getAllDrafts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const draftMessages = await getAllDraftMessages(
      (req as CustomRequest).user.username,
    );

    res.status(200).json({
      message: 'Draft messages fetched successfully',
      drafts: draftMessages,
    });
  } catch (error) {
    next(error);
  }
};
const sendDraftMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (
      !(await FindUser({ username: new RegExp(`\\b${req.body.to}\\b`, 'i') }))
    )
      return next(new CreateError('User not found', 400));
    const sentMessage = await updateDraft(req.params.messageId, 'draft', {
      to: req.body.to,
      status: 'sent',
      retracted: false,
      ...req.body,
    });
    res.status(200).json({
      message: 'Draft messages sent successfully',
      sentMessage,
    });
  } catch (error) {
    next(error);
  }
};
const getDraft = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const draftMessage = await getDraftMessage(
      req.params.messageId,
      (req as CustomRequest).user.username,
    );
    res.status(200).json({
      message: 'Draft message fetched successfully',
      draftMessage,
    });
  } catch (error) {
    next(error);
  }
};

const editDraftMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (
      !(await FindUser({ username: new RegExp(`\\b${req.body.to}\\b`, 'i') }))
    )
      return next(new CreateError('User not found', 400));
    const { to, title, content } = req.body;
    const draftMessage = await updateDraft(req.params.messageId, 'draft', {
      to,
      title,
      content,
      status: 'draft',
      retracted: false,
    });
    res.status(200).json({
      message: 'Draft message updated successfully',
      draftMessage,
    });
  } catch (error) {
    next(error);
  }
};

const fetchSentMessages = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sentMessages = await getAllSentMessages(
      (req as CustomRequest).user.username,
    );
    res.status(200).json({
      message: 'Sent messages fetched successfully',
      sentMessages,
    });
  } catch (error) {
    next(error);
  }
};

const fetchSentMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sentMessage = await getSentMessage(
      req.params.messageId,
      (req as CustomRequest).user.username,
    );
    res.status(200).json({
      message: 'Sent message fetched successfully',
      sentMessage,
    });
  } catch (error) {
    next(error);
  }
};
const retractMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const retractedMessage = await retractSentMessage(
      req.params.messageId,
      (req as CustomRequest).user.username,
    );
    res.status(200).json({
      message: 'Sent message retracted successfully',
      retractedMessage,
    });
  } catch (error) {
    next(error);
  }
};
const deleteDraftMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deletedMessage = await deleteMessage(
      req.params.messageId,
      (req as CustomRequest).user.username,
    );
    res.status(200).json({
      message: 'Draft message deleted successfully',
      deletedMessage,
    });
  } catch (error) {
    next(error);
  }
};

export {
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
};
