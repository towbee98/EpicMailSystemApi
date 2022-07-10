import { sign, verify } from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
// import { promisify } from 'util'
import config from '../config/env';
// console.log(config.JWT_SECRET)
// let jwtSecret:Secret=`${config.JWT_SECRET}`
export type jwtPayloadType =
  | { _id: string | ObjectId; username: string; email: string }
  | { email: string };

export const generateToken = async (payload: jwtPayloadType) => {
  return sign(payload, `${config.JWT_SECRET}`, { expiresIn: '4h' });
};

export const VerifyToken = (token: string) => {
  return verify(token, `${config.JWT_SECRET}`);
};
