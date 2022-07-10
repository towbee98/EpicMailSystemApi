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
exports.AuthCheck = void 0;
const ErrorClass_1 = __importDefault(require("../utils/ErrorClass"));
const token_1 = require("../utils/token");
const user_1 = require("../repository/user");
function PasswordIssuedAfterToken(jwtTimeStamp, passwordChangedAt) {
    const passwordTimeStamp = Math.floor(passwordChangedAt.valueOf() / 1000);
    return jwtTimeStamp < passwordTimeStamp;
}
const AuthCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // eslint-disable-next-line @typescript-eslint/no-inferrable-types
        let validToken = false;
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer', '').trim();
        if (!token)
            return next(new ErrorClass_1.default('You are not logged in, Please login', 403));
        const decoded = yield (0, token_1.VerifyToken)(token);
        const validUser = yield (0, user_1.FindUser)({
            username: decoded.username,
        });
        if (!validUser)
            return next(new ErrorClass_1.default('User not found,Login again', 400));
        if (validUser.status != 'Active')
            return next(new ErrorClass_1.default('Your account is not active,Please verify your email', 400));
        if (validUser.passwordChangedAt) {
            validToken = PasswordIssuedAfterToken(decoded.iat, validUser.passwordChangedAt);
        }
        if (validToken)
            return next(new ErrorClass_1.default('Password has changed , Login again', 403));
        req.user = validUser;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.AuthCheck = AuthCheck;
