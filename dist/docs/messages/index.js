"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Homepage_1 = __importDefault(require("./Homepage"));
const login_1 = __importDefault(require("./login"));
const signUp_1 = __importDefault(require("./signUp"));
const updatePassword_1 = __importDefault(require("./updatePassword"));
exports.default = {
    paths: {
        '/api/v1/messages/': Object.assign({}, Homepage_1.default),
        '/api/v1/auth/signup': Object.assign({}, signUp_1.default),
        '/api/v1/auth/login': Object.assign({}, login_1.default),
        '/api/v1/users/updatePassword': Object.assign({}, updatePassword_1.default)
    }
};
