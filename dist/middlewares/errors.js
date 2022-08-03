"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorClass_1 = require("../utils/ErrorClass");
const env_1 = __importDefault(require("../config/env"));
const errorHandler = (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    let customError = err;
    if (!(err instanceof ErrorClass_1.CreateError)) {
        console.log(err.name);
        console.log(env_1.default.NODE_ENV);
        if (env_1.default.NODE_ENV == 'production') {
            customError =
                err.code === 11000
                    ? new ErrorClass_1.CreateError('Error, Entity already exist', 400)
                    : err.name === 'CastError'
                        ? new ErrorClass_1.CreateError('Error,Invalid entity id', 400)
                        : err.name === 'ValidationError'
                            ? new ErrorClass_1.CreateError('There are some missing fields in the payload', 400)
                            : err.name === 'TokenExpiredError'
                                ? new ErrorClass_1.CreateError('Token expired , Login again', 401)
                                : err.name === 'JsonWebTokenError'
                                    ? new ErrorClass_1.CreateError('Bad Token, Please login again', 401)
                                    : new ErrorClass_1.CreateError('Internal Server error', 500);
        }
        customError =
            err.code === 11000
                ? new ErrorClass_1.CreateError(err.message, 400)
                : err.name === 'CastError'
                    ? new ErrorClass_1.CreateError(err.message, 400)
                    : err.name === 'ValidationError'
                        ? new ErrorClass_1.CreateError(err.message, 400)
                        : err.name === 'TokenExpiredError'
                            ? new ErrorClass_1.CreateError(err.message, 401)
                            : err.name === 'JsonWebTokenError'
                                ? new ErrorClass_1.CreateError(err.message, 401)
                                : new ErrorClass_1.CreateError('Internal Server error', 500);
    }
    return res
        .status(customError.status)
        .json({ message: customError.message });
};
exports.default = errorHandler;
