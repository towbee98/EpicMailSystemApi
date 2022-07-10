"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = CreateError;
