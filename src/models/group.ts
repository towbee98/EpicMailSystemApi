import mongoose from 'mongoose';

interface GroupInterface {
  createdBy: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
}

const groupSchema = new mongoose.Schema<GroupInterface>({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  },
});

const Group = mongoose.model('Group', groupSchema);

export default Group;
