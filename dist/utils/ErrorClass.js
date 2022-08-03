"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateError = void 0;
class CreateError {
    constructor(message, statusCode) {
        this.message = message;
        this.status = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.CreateError = CreateError;
