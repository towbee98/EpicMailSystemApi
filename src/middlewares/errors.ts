import type { ErrorRequestHandler } from 'express';
import { AppErrorArgs, CreateError } from '../utils/ErrorClass';
import config from '../config/env';

const errorHandler: ErrorRequestHandler = (
  err: AppErrorArgs | CreateError,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next,
) => {
  let customError = err;

  if (!(err instanceof CreateError)) {
    console.log(err.name);
    console.log(config.NODE_ENV);
    if (config.NODE_ENV == 'production') {
      customError =
        err.code === 11000
          ? new CreateError('Error, Entity already exist', 400)
          : err.name === 'CastError'
          ? new CreateError('Error,Invalid entity id', 400)
          : err.name === 'ValidationError'
          ? new CreateError('There are some missing fields in the payload', 400)
          : err.name === 'TokenExpiredError'
          ? new CreateError('Token expired , Login again', 401)
          : err.name === 'JsonWebTokenError'
          ? new CreateError('Bad Token, Please login again', 401)
          : new CreateError('Internal Server error', 500);
    } else {
      customError =
        err.code === 11000
          ? new CreateError(err.message, 400)
          : err.name === 'CastError'
          ? new CreateError(err.message, 400)
          : err.name === 'ValidationError'
          ? new CreateError(err.message, 400)
          : err.name === 'TokenExpiredError'
          ? new CreateError(err.message, 401)
          : err.name === 'JsonWebTokenError'
          ? new CreateError(err.message, 401)
          : new CreateError('Internal Server error', 500);
    }
  }

  return res
    .status((customError as CreateError).status)
    .json({ message: customError.message });
};

export default errorHandler;
