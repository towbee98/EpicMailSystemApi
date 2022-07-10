"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResetPwPayload = exports.validateEmail = exports.validatePassword = exports.validateLoginUser = exports.validateCreateUserSchema = void 0;
const ErrorClass_1 = __importDefault(require("./ErrorClass"));
const validateCreateUserSchema = ({ name, username, password, email, }) => {
    const Errors = [];
    if (name.length > 20 || name.length < 2)
        Errors.push('name must be at least 2 characters and at most 20 characters.');
    if (!/[a-zA-Z]+/g.test(name))
        Errors.push('Name can only contain aplhabets.');
    if (!/^[a-zA-Z]+\d+$/g.test(username))
        Errors.push('username can only contain alphabets and digit at the end.');
    if (username.length < 7 || username.length > 15)
        Errors.push('username must be at least 7 characters and at most 15 characters.');
    if (password.length < 7)
        Errors.push('password is too short,It must have at least 7 characters.');
    if (password.length > 15)
        Errors.push('Password too long , Password cannot exceed 15 characters.');
    if (!/^[a-zA-Z]+\d+[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]$/g.test(password))
        Errors.push('password must contain at least a digit  and a single special character at the end of it.');
    if (typeof password != 'string')
        Errors.push('${password} must be a string.');
    if (!/^[a-zA-Z]+\d+@[a-zA-Z]+\.[a-zA-Z]+$/g.test(email))
        Errors.push('Please enter a valid email.');
    return Errors;
};
exports.validateCreateUserSchema = validateCreateUserSchema;
const validateLoginUser = ({ username, password }) => {
    if (!/^[a-zA-Z]+\d+$/g.test(username))
        throw new ErrorClass_1.default('${username} can only contain alphabets and digit at the end', 400);
    if (username.length < 7)
        throw new ErrorClass_1.default('${username} must be at least 7 characters', 400);
    if (username.length > 15)
        throw new ErrorClass_1.default('${username}cannot be longer than 15 characters', 400);
    if (password.length < 7)
        throw new ErrorClass_1.default('password is too short.It must have at least 7 characters', 400);
    if (password.length > 15)
        throw new ErrorClass_1.default('Password too long , Password cannot exceed 15 characters', 400);
    if (!/^[a-zA-Z]+\d+[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]$/g.test(password))
        throw new ErrorClass_1.default('password must contain at least a digit  and a single special character at the end of it', 400);
    if (typeof password != 'string')
        throw new ErrorClass_1.default('${password} must be a string', 400);
    return { username, password };
};
exports.validateLoginUser = validateLoginUser;
const validatePassword = (password) => {
    if (password.length < 7)
        throw new ErrorClass_1.default('New password is too short.It must have at least 7 characters', 400);
    if (password.length > 15)
        throw new ErrorClass_1.default('New Password too long , Password cannot exceed 15 characters', 400);
    if (!/^[a-zA-Z]+\d+[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]$/g.test(password))
        throw new ErrorClass_1.default('New password must contain at least a digit  and a single special character at the end of it', 400);
    if (typeof password != 'string')
        throw new ErrorClass_1.default('${password} must be a string', 400);
    return password;
};
exports.validatePassword = validatePassword;
const validateEmail = (payload) => {
    const Errors = [];
    if (!/^[a-zA-Z]+\d+@[a-zA-Z]+\.[a-zA-Z]+$/g.test(payload.email))
        Errors.push('Please enter a valid email.');
    return Errors;
};
exports.validateEmail = validateEmail;
const validateResetPwPayload = (payload) => {
    const Errors = [];
    if (payload.userId.trim().length <= 10 &&
        payload.resetToken.trim().length <= 10)
        Errors.push('Invalid Token or User Id.');
    if (payload.password.length < 7)
        Errors.push('password is too short,It must have at least 7 characters.');
    if (payload.password.length > 15)
        Errors.push('Password too long , Password cannot exceed 15 characters.');
    if (!/^[a-zA-Z]+\d+[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]$/g.test(payload.password))
        Errors.push('password must contain at least a digit  and a single special character at the end of it.');
    if (typeof payload.password != 'string')
        Errors.push('${password} must be a string.');
    return Errors;
};
exports.validateResetPwPayload = validateResetPwPayload;
