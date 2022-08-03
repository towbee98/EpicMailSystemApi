/* eslint-disable no-useless-catch */
import message, { messageInterface } from '../models/message';

const createMessage = async (messagePayload: messageInterface) => {
  try {
    return await message.create(messagePayload);
  } catch (err) {
    throw err;
  }
};

const getInbox = async (query: { id: string; to: string }) => {
  try {
    return await message.findOne({
      _id: query.id,
      ...query,
      status: 'sent',
      retracted: false,
    });
  } catch (error) {
    throw error;
  }
};

const getAllInboxMessage = async (to: string) => {
  try {
    return await message
      .find({ to, status: 'sent', retracted: false })
      .sort({ createdAt: 'desc' });
  } catch (error) {
    throw error;
  }
};

const retractMessage = async (query: { id: string; from: string }) => {
  try {
    return await message.findOneAndUpdate(
      { _id: query.id, from: query.from },
      { retracted: true, status: 'draft', to: null },
      {
        runValidators: true,
        new: true,
      },
    );
  } catch (error) {
    throw error;
  }
};

const updateDraft = async (
  id: string,
  status: 'draft',
  update: {
    title?: string;
    content?: string;
    to?: string;
    status: 'draft' | 'sent';
    retracted: boolean;
  },
) => {
  try {
    return await message.findOneAndUpdate(
      { _id: id, status },
      update,

      {
        runValidators: true,
        new: true,
      },
    );
  } catch (error) {
    throw error;
  }
};

const getDraftMessage = async (id: string, from: string) => {
  try {
    return await message.findOne({ _id: id, from, status: 'draft' });
  } catch (error) {
    throw error;
  }
};

const getAllDraftMessages = async (from: string) => {
  try {
    return await message
      .find({ from, status: 'draft' })
      .sort({ createdAt: 'desc' });
  } catch (error) {
    throw error;
  }
};

const getAllSentMessages = async (from: string) => {
  try {
    return await message
      .find({ from, status: 'sent' })
      .sort({ createdAt: 'desc' });
  } catch (error) {
    throw error;
  }
};

const getSentMessage = async (id: string, from: string) => {
  try {
    return await message.findOne({ _id: id, from, status: 'sent' });
  } catch (error) {
    throw error;
  }
};

const retractSentMessage = async (id: string, from: string) => {
  try {
    return await message.findOneAndUpdate(
      { _id: id, from, status: 'sent', retracted: false },
      { retracted: true, to: null, status: 'draft' },
      {
        runValidators: true,
        new: true,
      },
    );
  } catch (error) {
    throw error;
  }
};

const deleteMessage = async (id: string, from: string) => {
  try {
    return await message.findOneAndDelete({ _id: id, from, status: 'draft' });
  } catch (error) {
    throw error;
  }
};
export {
  createMessage,
  getInbox,
  getAllInboxMessage,
  retractMessage,
  updateDraft,
  getDraftMessage,
  getAllDraftMessages,
  getSentMessage,
  getAllSentMessages,
  retractSentMessage,
  deleteMessage,
};
