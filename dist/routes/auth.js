"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
const authController_1 = require("../controllers/authController");
const validate_1 = require("../middlewares/validate");
authRouter.route('/login').post(authController_1.LoginController);
authRouter.route('/signup').post(validate_1.validatePayload, authController_1.SignUpController);
authRouter.route('/:confirmCode').get(authController_1.verifyUser);
authRouter
    .route('/forgetPassword')
    .post(validate_1.validateForgetPasswordPayload, authController_1.forgetPassword);
authRouter
    .route('/resetPassword/:userId/:resetToken')
    .post(validate_1.validateResetPasswordPayload, authController_1.resetPassword);
exports.default = authRouter;
