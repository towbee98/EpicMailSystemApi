import mongoose from 'mongoose';

type Status = 'draft' | 'sent' | 'retracted';

export interface messageInterface {
  from: string;
  to: string | null;
  title: string | null;
  content: string | null;
  retracted: boolean;
  status: Status;
}

const messageSchema = new mongoose.Schema<messageInterface>(
  {
    from: {
      type: String,
      ref: 'User',
      required: true,
    },
    to: {
      type: String,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    retracted: {
      type: Boolean,
      default: false,
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'sent'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
