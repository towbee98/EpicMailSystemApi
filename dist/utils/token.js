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
exports.VerifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
// import { promisify } from 'util'
const env_1 = __importDefault(require("../config/env"));
const generateToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, jsonwebtoken_1.sign)(payload, `${env_1.default.JWT_SECRET}`, { expiresIn: '4h' });
});
exports.generateToken = generateToken;
const VerifyToken = (token) => {
    return (0, jsonwebtoken_1.verify)(token, `${env_1.default.JWT_SECRET}`);
};
exports.VerifyToken = VerifyToken;
