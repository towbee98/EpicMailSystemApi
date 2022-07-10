import mongoose from 'mongoose';

type Status = 'draft' | 'sent' | 'retracted';
interface messageInterface {
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId[];
  date: Date;
  title: string;
  content: string;
  status: Status;
}

const messageSchema = new mongoose.Schema<messageInterface>({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  to: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'sent', 'retracted'],
    required: true,
  },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
