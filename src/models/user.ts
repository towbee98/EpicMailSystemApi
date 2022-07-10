import mongoose, { Document } from 'mongoose';

// .1 Interface
export interface UserInterface extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  group?: mongoose.Types.ObjectId[];
  passwordChangedAt?: Date;
  confirmCode: string;
  status: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

// 2.Schema
const userSchema = new mongoose.Schema<UserInterface>({
  name: {
    type: String,
    required: [true, 'Name cannot be empty'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'username cannot be empty'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'phone number is required'],
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty'],
    select: false,
  },
  group: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Group',
  },
  confirmCode: String,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  status: {
    type: String,
    enum: ['Active', 'Pending'],
    default: 'Pending',
  },
});

userSchema.methods.toJSON = function toJSON() {
  return {
    name: this.name,
    username: this.username,
    email: this.email,
    group: this.group,
    passwordChangedAt: this.passwordChangedAt,
    status: this.status,
  };
};

// 3. Create the model
const User: mongoose.Model<UserInterface> = mongoose.model('User', userSchema);

export default User;
