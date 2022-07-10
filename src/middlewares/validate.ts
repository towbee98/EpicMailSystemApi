import { RequestHandler } from 'express';
import CreateError from '../utils/ErrorClass';
import {
  validateCreateUserSchema,
  validateEmail,
  validateResetPwPayload,
} from '../utils/validators';

export const validatePayload: RequestHandler = async (req, res, next) => {
  let errors: string[] = [];
  errors = validateCreateUserSchema(req.body);
  if (errors.length != 0) next(new CreateError(`${errors}`, 400));
  next();
};

export const validateForgetPasswordPayload: RequestHandler = async (
  req,
  res,
  next,
) => {
  let errors: string[] = [];
  errors = validateEmail(req.body);
  if (errors.length != 0) next(new CreateError(`${errors}`, 400));
  next();
};

export const validateResetPasswordPayload: RequestHandler = async (
  req,
  res,
  next,
) => {
  if (!req.body.password)
    return next(new CreateError('Password field cannot be empty', 400));
  let errors: string[] = [];
  errors = validateResetPwPayload({
    resetToken: req.params.resetToken,
    userId: req.params.userId,
    password: req.body.password,
  });
  if (errors.length != 0) next(new CreateError(`${errors}`, 400));
  next();
};
