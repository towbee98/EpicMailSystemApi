"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const Email_1 = require("../utils/Email");
const eventEmitter = new events_1.default();
class eventHandler {
    constructor(user, url) {
        this.user = user;
        this.url = url;
        eventEmitter.once('sendmail', () => {
            new Email_1.Welcome(user, url).sendConfirmMail();
        });
        eventEmitter.once('forget', () => {
            new Email_1.ForgetPassword(user, url).sendResetTokenMail();
        });
    }
    welcome() {
        return eventEmitter.emit('sendmail');
    }
    forgetPassword() {
        return eventEmitter.emit('forget');
    }
}
exports.default = eventHandler;
