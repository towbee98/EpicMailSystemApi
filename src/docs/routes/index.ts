import forgetPassword from './forgetPassword';
import Homepage from './Homepage';
import login from './login';
import signUp from './signUp';
import updatePassword from './updatePassword';
import verifyUser from './verifyUser';
import resetPassword from './resetPassword';

export default {
  paths: {
    '/api/v1/messages/': { ...Homepage },
    '/api/v1/auth/signup': { ...signUp },
    '/api/v1/auth/login': { ...login },
    '/api/v1/auth/{confirmCode}': { ...verifyUser },
    '/api/v1/auth/forgetPassword': { ...forgetPassword },
    '/api/v1/auth/resetPassword/{userId}/{resetToken}': { ...resetPassword },
    '/api/v1/users/updatePassword': { ...updatePassword },
  },
};
