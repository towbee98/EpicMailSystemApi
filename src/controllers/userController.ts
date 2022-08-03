import { RequestHandler, Request } from 'express';
import { LoginUser, ChangePassword, findAllUsers } from '../repository/user';
import { compareFields } from '../utils/password';
import { validatePassword } from '../utils/validators';
import { CreateError } from '../utils/ErrorClass';

interface CustomRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/ban-types
  user: string | Object;
}
export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await findAllUsers({});
    res.status(200).json({
      status:'success',
      message:'Users retrieved successfully',
      users
    })
  } catch (error) {
    next(error);
  }
};
export const UpdatePassword: RequestHandler = async (req, res, next) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loggedInUser: any = (req as CustomRequest).user;
    const { password, newPassword } = req.body;
    const validatedPassword: string = validatePassword(newPassword);
    const user = await LoginUser(loggedInUser.username);
    if (!user) return next(new CreateError('User not found', 404));

    if (!(await compareFields(password, user.password)))
      return next(new CreateError('Invalid password', 400));

    const result = await ChangePassword(user, validatedPassword);

    res.status(200).json({
      status: 'success',
      result,
      messaage: 'Password changed successfully',
    });
  } catch (error) {
    next(error);
  }
};
