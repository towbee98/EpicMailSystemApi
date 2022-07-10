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
exports.UpdatePassword = exports.HomePage = void 0;
const user_1 = require("../repository/user");
const password_1 = require("../utils/password");
const validators_1 = require("../utils/validators");
const ErrorClass_1 = __importDefault(require("../utils/ErrorClass"));
const HomePage = (req, res, next) => {
    try {
        res.status(200).json({
            status: 'success',
            message: 'This is the home page',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.HomePage = HomePage;
const UpdatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const loggedInUser = req.user;
        const { password, newPassword } = req.body;
        const validatedPassword = (0, validators_1.validatePassword)(newPassword);
        const user = yield (0, user_1.LoginUser)(loggedInUser.username);
        if (!user)
            return next(new ErrorClass_1.default('User not found', 404));
        if (!(yield (0, password_1.compareFields)(password, user.password)))
            return next(new ErrorClass_1.default('Invalid password', 400));
        const result = yield (0, user_1.ChangePassword)(user, validatedPassword);
        res.status(200).json({
            status: 'success',
            result,
            messaage: 'Password changed successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.UpdatePassword = UpdatePassword;
