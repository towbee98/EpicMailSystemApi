import { RequestHandler } from 'express';
import { CreateUser, LoginUser, FindUser } from '../repository/user';
import { validateLoginUser } from '../utils/validators';
import {
  generatePasswordHash,
  compareFields,
  generatePasswordResetToken,
  generateResetTokenHash,
} from '../utils/password';
import CreateError from '../utils/ErrorClass';
import { generateToken } from '../utils/token';
import { Welcome, ForgetPassword } from '../utils/Email';
// import { ObjectId } from 'mongoose';
type LoginPayload = { username: string; password: string };
type SignupPayload = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export const LoginController: RequestHandler = async (req, res, next) => {
  try {
    const data: LoginPayload = req.body;

    const validatedData = validateLoginUser(data);

    const user = await LoginUser(validatedData.username);
    if (!user) return next(new CreateError('User does not exists', 404));
    if (!(await compareFields(validatedData.password, user.password)))
      return next(
        new CreateError('The password and email are not compatible', 400),
      );
    const token: string = await generateToken({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
    res.status(200).json({
      status: 'success',
      token,
      message: 'Login successful',
    });
  } catch (error) {
    next(error);
  }
};

export const SignUpController: RequestHandler = async (req, res, next) => {
  try {
    const data: SignupPayload = req.body;
    const confirmCode: string = await generateToken({ email: data.email });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newUser: any = await CreateUser({
      ...data,
      confirmCode,
      status: 'Pending',
    });

    const url = `${req.protocol}://${req.get(
      'host',
    )}/api/v1/auth/${confirmCode}`;
    await new Welcome(newUser, url).sendConfirmMail();
    res.status(201).json({
      status: 'success',
      newUser: newUser,
      message: 'Sign up  successful.Check your email to verify your account',
    });
  } catch (error) {
    next(error);
  }
};

export const verifyUser: RequestHandler = async (req, res, next) => {
  try {
    const confirmToken: string = req.params.confirmCode;
    if (!confirmToken)
      return next(new CreateError('Confirmation Code not found', 422));
    const user = await FindUser({ confirmCode: confirmToken });
    if (!user)
      return next(
        new CreateError('User not found or invalid confirmation code', 400),
      );
    user.status = 'Active';
    user.save();
    res.status(200).json({
      status: 'success',
      user,
      message: 'User verification successful, Please login to gain full access',
    });
  } catch (error) {
    next(error);
  }
};

export const forgetPassword: RequestHandler = async (req, res, next) => {
  try {
    const email: string = req.body.email;
    const user = await FindUser({ email });
    if (!user) return next(new CreateError('Email not found', 404));
    const TokensObject = await generatePasswordResetToken();
    console.log(TokensObject.hashedResetToken);
    console.log(generateResetTokenHash(TokensObject.resetToken));
    const url = `${req.protocol}://${req.get(
      'host',
    )}/api/v1/auth/resetPassword/${user._id}/${TokensObject.resetToken}`;
    await new ForgetPassword(user, url).sendResetTokenMail();
    user.passwordResetToken = TokensObject.hashedResetToken;
    user.passwordResetExpires = new Date(Date.now() + 20 * 60 * 1000);
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Password reset link has been sent to your email.Please check',
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const resetPassword: RequestHandler = async (req, res, next) => {
  try {
    const userId: string = req.params.userId;
    const resetToken: string = req.params.resetToken.trim();
    const newPassword: string = req.body.password.trim();
    const user = await FindUser({
      _id: userId,
      passwordResetToken: generateResetTokenHash(resetToken),
      passwordResetExpires: { $gt: new Date(Date.now()) },
    });

    // console.log(user);
    // console.log(generateResetTokenHash(resetToken));
    if (!user)
      return next(new CreateError('User not found or Token has expired.', 400));

    user.password = await generatePasswordHash(newPassword);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.passwordChangedAt = new Date(Date.now() - 1000);
    await user.save();
    res.status(200).json({
      status: 'success',
      message: 'Password Changed Successfully',
    });
  } catch (error) {
    next(error);
  }
};
