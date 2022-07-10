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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgetPassword = exports.verifyUser = exports.SignUpController = exports.LoginController = void 0;
const user_1 = require("../repository/user");
const validators_1 = require("../utils/validators");
const password_1 = require("../utils/password");
const ErrorClass_1 = __importDefault(require("../utils/ErrorClass"));
const token_1 = require("../utils/token");
const Email_1 = require("../utils/Email");
const LoginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const validatedData = (0, validators_1.validateLoginUser)(data);
        const user = yield (0, user_1.LoginUser)(validatedData.username);
        if (!user)
            return next(new ErrorClass_1.default('User does not exists', 404));
        if (!(yield (0, password_1.compareFields)(validatedData.password, user.password)))
            return next(new ErrorClass_1.default('The password and email are not compatible', 400));
        const token = yield (0, token_1.generateToken)({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
        res.status(200).json({
            status: 'success',
            token,
            message: 'Login successful',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.LoginController = LoginController;
const SignUpController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const confirmCode = yield (0, token_1.generateToken)({ email: data.email });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newUser = yield (0, user_1.CreateUser)(Object.assign(Object.assign({}, data), { confirmCode, status: 'Pending' }));
        const url = `${req.protocol}://${req.get('host')}/api/v1/auth/${confirmCode}`;
        yield new Email_1.Welcome(newUser, url).sendConfirmMail();
        res.status(201).json({
            status: 'success',
            newUser: newUser,
            message: 'Sign up  successful.Check your email to verify your account',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.SignUpController = SignUpController;
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const confirmToken = req.params.confirmCode;
        if (!confirmToken)
            return next(new ErrorClass_1.default('Confirmation Code not found', 422));
        const user = yield (0, user_1.FindUser)({ confirmCode: confirmToken });
        if (!user)
            return next(new ErrorClass_1.default('User not found or invalid confirmation code', 400));
        user.status = 'Active';
        user.save();
        res.status(200).json({
            status: 'success',
            user,
            message: 'User verification successful, Please login to gain full access',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.verifyUser = verifyUser;
const forgetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const user = yield (0, user_1.FindUser)({ email });
        if (!user)
            return next(new ErrorClass_1.default('Email not found', 404));
        const TokensObject = yield (0, password_1.generatePasswordResetToken)();
        console.log(TokensObject.hashedResetToken);
        console.log((0, password_1.generateResetTokenHash)(TokensObject.resetToken));
        const url = `${req.protocol}://${req.get('host')}/api/v1/auth/resetPassword/${user._id}/${TokensObject.resetToken}`;
        yield new Email_1.ForgetPassword(user, url).sendResetTokenMail();
        user.passwordResetToken = TokensObject.hashedResetToken;
        user.passwordResetExpires = new Date(Date.now() + 20 * 60 * 1000);
        yield user.save();
        res.status(200).json({
            status: 'success',
            message: 'Password reset link has been sent to your email.Please check',
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.forgetPassword = forgetPassword;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const resetToken = req.params.resetToken.trim();
        const newPassword = req.body.password.trim();
        const user = yield (0, user_1.FindUser)({
            _id: userId,
            passwordResetToken: (0, password_1.generateResetTokenHash)(resetToken),
            passwordResetExpires: { $gt: new Date(Date.now()) },
        });
        // console.log(user);
        // console.log(generateResetTokenHash(resetToken));
        if (!user)
            return next(new ErrorClass_1.default('User not found or Token has expired.', 400));
        user.password = yield (0, password_1.generatePasswordHash)(newPassword);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        user.passwordChangedAt = new Date(Date.now() - 1000);
        yield user.save();
        res.status(200).json({
            status: 'success',
            message: 'Password Changed Successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.resetPassword = resetPassword;
