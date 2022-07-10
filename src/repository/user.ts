import User, { UserInterface } from '../models/user';
import { DocumentDefinition, HydratedDocument } from 'mongoose';
import { generatePasswordHash } from '../utils/password';

export const CreateUser = async (data: DocumentDefinition<UserInterface>) => {
  data.password = await generatePasswordHash(data.password);
  const newUser = await User.create(data);
  return newUser;
};

export const LoginUser = async (username: string) => {
  const user = await User.findOne({ username }).select('+password');
  return user;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const FindUser = async (query: Object) => {
  const user = await User.findOne(query);
  return user;
};

export const FindAUser = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

// export const FindAndUpdateUser = async (confirmCode: string) => {
//   const user = await User.findOneAndUpdate(
//     { confirmCode },
//     { status: 'Active' },
//     { runValidators: true, new: true },
//   );
//   return user;
// };

export const ChangePassword = async (
  user: HydratedDocument<UserInterface>,
  password: string,
) => {
  password = await generatePasswordHash(password);
  user.password = password;
  user.passwordChangedAt = new Date(Date.now() - 1000);

  await user.save();
  return user.toJSON();
};
