// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');
import { google } from 'googleapis';
import config from '../config/env';
import pug from 'pug';
import { convert } from 'html-to-text';
import { UserInterface } from '../models/user';

const OAuth2 = google.auth.OAuth2;
type User = {
  name: string;
  email: string;
  username: string;
  group: Array<string>;
  status: string;
};

class Email {
  to: string;
  name: string;
  url: string;
  from: string;
  constructor(user: User | UserInterface, url: string) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = `Epic-mail-system <${config.EMAIL}>`;
  }
  newTransport() {
    // if (config.NODE_ENV === 'production') {
    // Gmail
    const oauth2Client = new OAuth2(
      config.CLIENT_ID,
      config.CLIENT_SECRET,
      config.REDIRECT_URI,
    );
    oauth2Client.setCredentials({
      // eslint-disable-next-line camelcase
      refresh_token: config.REFRESH_TOKEN,
    });
    const accessToken = oauth2Client.getAccessToken((err, token) => {
      return err ? err : token;
    });
    return nodemailer.createTransport({
      service: config.MAIL_SERVICE,
      auth: {
        type: config.MAIL_AUTH_TYPE,
        user: config.EMAIL,
        clientId: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET,
        refreshToken: config.REFRESH_TOKEN,
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
  async send(template: string, subject: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const html: any = pug.renderFile(`view/${template}.pug`, {
      name: this.name,
      url: this.url,
      subject,
    });
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html, { wordwrap: 130 }),
    };
    await this.newTransport().sendMail(mailOptions);
  }
}

class Welcome extends Email {
  constructor(user: User, url: string) {
    super(user, url);
  }
  async sendConfirmMail() {
    await this.send('Welcome', 'Welcome to EpicMail');
  }
}

class ForgetPassword extends Email {
  constructor(user: UserInterface, url: string) {
    super(user, url);
  }
  async sendResetTokenMail() {
    await this.send(
      'forgetPasswordMail',
      'Reset Password instruction for your Epic Mail Account(Valid for 10 mins)',
    );
  }
}

export { Welcome, ForgetPassword };
