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
exports.ForgetPassword = exports.Welcome = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');
const googleapis_1 = require("googleapis");
const env_1 = __importDefault(require("../config/env"));
const pug_1 = __importDefault(require("pug"));
const html_to_text_1 = require("html-to-text");
const OAuth2 = googleapis_1.google.auth.OAuth2;
class Email {
    constructor(user, url) {
        this.to = user.email;
        this.name = user.name;
        this.url = url;
        this.from = `Epic-mail-system <${env_1.default.EMAIL}>`;
    }
    newTransport() {
        // if (config.NODE_ENV === 'production') {
        // Gmail
        const oauth2Client = new OAuth2(env_1.default.CLIENT_ID, env_1.default.CLIENT_SECRET, env_1.default.REDIRECT_URI);
        oauth2Client.setCredentials({
            // eslint-disable-next-line camelcase
            refresh_token: env_1.default.REFRESH_TOKEN,
        });
        const accessToken = oauth2Client.getAccessToken((err, token) => {
            return err ? err : token;
        });
        return nodemailer.createTransport({
            service: env_1.default.MAIL_SERVICE,
            auth: {
                type: env_1.default.MAIL_AUTH_TYPE,
                user: env_1.default.EMAIL,
                clientId: env_1.default.CLIENT_ID,
                clientSecret: env_1.default.CLIENT_SECRET,
                refreshToken: env_1.default.REFRESH_TOKEN,
                accessToken,
            },
        });
        // }else{
        //   return nodemailer.createTransport({
        //     host:config.
        //   })
        // }
    }
    // Send the mail
    send(template, subject) {
        return __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const html = pug_1.default.renderFile(`view/${template}.pug`, {
                name: this.name,
                url: this.url,
                subject,
            });
            const mailOptions = {
                from: this.from,
                to: this.to,
                subject,
                html,
                text: (0, html_to_text_1.convert)(html, { wordwrap: 130 }),
            };
            yield this.newTransport().sendMail(mailOptions);
        });
    }
}
class Welcome extends Email {
    constructor(user, url) {
        super(user, url);
    }
    sendConfirmMail() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send('Welcome', 'Welcome to EpicMail');
        });
    }
}
exports.Welcome = Welcome;
class ForgetPassword extends Email {
    constructor(user, url) {
        super(user, url);
    }
    sendResetTokenMail() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send('forgetPasswordMail', 'Reset Password instruction for your Epic Mail Account(Valid for 10 mins)');
        });
    }
}
exports.ForgetPassword = ForgetPassword;
