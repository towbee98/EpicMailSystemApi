import EventEmitter from 'events';
import { Welcome, ForgetPassword } from '../utils/Email';

const eventEmitter = new EventEmitter();

class eventHandler {
  user: any;
  url: string;
  constructor(user: any, url: string) {
    this.user = user;
    this.url = url;
    eventEmitter.once('sendmail', () => {
      new Welcome(user, url).sendConfirmMail();
    });
    eventEmitter.once('forget', () => {
      new ForgetPassword(user, url).sendResetTokenMail();
    });
  }
  welcome() {
    return eventEmitter.emit('sendmail');
  }
  forgetPassword() {
    return eventEmitter.emit('forget');
  }
}

export default eventHandler;
