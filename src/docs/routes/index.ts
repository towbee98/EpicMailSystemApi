import forgetPassword from './forgetPassword';
import sendMessage from './sendMessage';
import login from './login';
import signUp from './signUp';
import updatePassword from './updatePassword';
import verifyUser from './verifyUser';
import resetPassword from './resetPassword';
import getAllInbox from './getAllInbox';
import getAllDrafts from './getAllDrafts';
import getAnInbox from './getAnInbox';
import draftsOperation from './draftsOperation';
import getAllSentMessage from './getAllSentMessage';
import getSentMessage from './getSentMessage';
import retractMessage from './retractMessage';

export default {
  paths: {
    '/api/v1/messages/': { ...sendMessage },
    '/api/v1/messages/inbox': { ...getAllInbox },
    '/api/v1/messages/inbox/{messageId}': { ...getAnInbox },
    '/api/v1/messages/drafts': { ...getAllDrafts },
    '/api/v1/messages/drafts/{messageId}': { ...draftsOperation },
    '/api/v1/messages/sent': { ...getAllSentMessage },
    '/api/v1/messages/sent/{messageId}': { ...getSentMessage },
    '/api/v1/messages/sent/{messageId}/retract': { ...retractMessage },
    '/api/v1/auth/signup': { ...signUp },
    '/api/v1/auth/login': { ...login },
    '/api/v1/auth/{confirmCode}': { ...verifyUser },
    '/api/v1/auth/forgetPassword': { ...forgetPassword },
    '/api/v1/auth/resetPassword/{userId}/{resetToken}': { ...resetPassword },
    '/api/v1/users/updatePassword': { ...updatePassword },
  },
};
