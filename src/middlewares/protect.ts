import { RequestHandler, Request } from 'express';
import CreateError from '../utils/ErrorClass';
import { VerifyToken } from '../utils/token';
import { Document, ObjectId } from 'mongoose';
import { FindUser } from '../repository/user';

interface CustomRequest extends Request {
  user: string | Document;
}

interface tokenPayload {
  _id: string | ObjectId;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

function PasswordIssuedAfterToken(
  jwtTimeStamp: number,
  passwordChangedAt: Date,
): boolean {
  const passwordTimeStamp = Math.floor(passwordChangedAt.valueOf() / 1000);
  return jwtTimeStamp < passwordTimeStamp;
}

export const AuthCheck: RequestHandler = async (req, res, next) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    let validToken: boolean = false;
    const token = req.header('Authorization')?.replace('Bearer', '').trim();
    if (!token)
      return next(new CreateError('You are not logged in, Please login', 403));
    const decoded = await VerifyToken(token);
    const validUser = await FindUser({
      username: (decoded as tokenPayload).username,
    });
    if (!validUser)
      return next(new CreateError('User not found,Login again', 400));
    if (validUser.status != 'Active')
      return next(
        new CreateError(
          'Your account is not active,Please verify your email',
          400,
        ),
      );
    if (validUser.passwordChangedAt) {
      validToken = PasswordIssuedAfterToken(
        (decoded as tokenPayload).iat,
        validUser.passwordChangedAt,
      );
    }
    if (validToken)
      return next(new CreateError('Password has changed , Login again', 403));

    (req as CustomRequest).user = validUser;
    next();
  } catch (error) {
    next(error);
  }
};
