"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResetPasswordPayload = exports.validateForgetPasswordPayload = exports.validatePayload = void 0;
const ErrorClass_1 = require("../utils/ErrorClass");
const validators_1 = require("../utils/validators");
const validatePayload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let errors = [];
    errors = (0, validators_1.validateCreateUserSchema)(req.body);
    if (errors.length != 0)
        next(new ErrorClass_1.CreateError(`${errors}`, 400));
    next();
});
exports.validatePayload = validatePayload;
const validateForgetPasswordPayload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let errors = [];
    errors = (0, validators_1.validateEmail)(req.body);
    if (errors.length != 0)
        next(new ErrorClass_1.CreateError(`${errors}`, 400));
    next();
});
exports.validateForgetPasswordPayload = validateForgetPasswordPayload;
const validateResetPasswordPayload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.password)
        return next(new ErrorClass_1.CreateError('Password field cannot be empty', 400));
    let errors = [];
    errors = (0, validators_1.validateResetPwPayload)({
        resetToken: req.params.resetToken,
        userId: req.params.userId,
        password: req.body.password,
    });
    if (errors.length != 0)
        next(new ErrorClass_1.CreateError(`${errors}`, 400));
    next();
});
exports.validateResetPasswordPayload = validateResetPasswordPayload;
