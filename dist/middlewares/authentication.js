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
// import {Request} from 'express'
const user_1 = require("../repository/user");
//  interface CustomRequest extends Request{
//      user:string | ObjectId
//  }
const AuthCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //check if token exists in the header
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer', '').trim();
        if (!token)
            return next(new ErrorClass_1.default("You are not logged in, Please login", 403));
        //If it exists verify the token 
        const decoded = yield (0, token_1.VerifyToken)(token);
        console.log(decoded);
        //if it is valid assign Check if the user with the validtoken exist
        const validUser = yield (0, user_1.FindUser)(decoded.username);
        if (!validUser)
            return next(new ErrorClass_1.default("User not found , Login again", 401));
        console.log(validUser);
        //Check if the user has not changed his password after token was issued
        // if(validUser.passwordChangedAt:Date) 
        //Assign the validUser to token
        //@ts-ignore
        req.user = validUser;
        next();
    }
    catch (error) {
        //console.log(error)
        next(error);
    }
});
exports.AuthCheck = AuthCheck;
