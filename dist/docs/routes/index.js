"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgetPassword_1 = __importDefault(require("./forgetPassword"));
const sendMessage_1 = __importDefault(require("./sendMessage"));
const login_1 = __importDefault(require("./login"));
const signUp_1 = __importDefault(require("./signUp"));
const updatePassword_1 = __importDefault(require("./updatePassword"));
const verifyUser_1 = __importDefault(require("./verifyUser"));
const resetPassword_1 = __importDefault(require("./resetPassword"));
const getAllInbox_1 = __importDefault(require("./getAllInbox"));
const getAllDrafts_1 = __importDefault(require("./getAllDrafts"));
const getAnInbox_1 = __importDefault(require("./getAnInbox"));
const draftsOperation_1 = __importDefault(require("./draftsOperation"));
const getAllSentMessage_1 = __importDefault(require("./getAllSentMessage"));
const getSentMessage_1 = __importDefault(require("./getSentMessage"));
const retractMessage_1 = __importDefault(require("./retractMessage"));
exports.default = {
    paths: {
        '/api/v1/messages/': Object.assign({}, sendMessage_1.default),
        '/api/v1/messages/inbox': Object.assign({}, getAllInbox_1.default),
        '/api/v1/messages/inbox/{messageId}': Object.assign({}, getAnInbox_1.default),
        '/api/v1/messages/drafts': Object.assign({}, getAllDrafts_1.default),
        '/api/v1/messages/drafts/{messageId}': Object.assign({}, draftsOperation_1.default),
        '/api/v1/messages/sent': Object.assign({}, getAllSentMessage_1.default),
        '/api/v1/messages/sent/{messageId}': Object.assign({}, getSentMessage_1.default),
        '/api/v1/messages/sent/{messageId}/retract': Object.assign({}, retractMessage_1.default),
        '/api/v1/auth/signup': Object.assign({}, signUp_1.default),
        '/api/v1/auth/login': Object.assign({}, login_1.default),
        '/api/v1/auth/{confirmCode}': Object.assign({}, verifyUser_1.default),
        '/api/v1/auth/forgetPassword': Object.assign({}, forgetPassword_1.default),
        '/api/v1/auth/resetPassword/{userId}/{resetToken}': Object.assign({}, resetPassword_1.default),
        '/api/v1/users/updatePassword': Object.assign({}, updatePassword_1.default),
    },
};
