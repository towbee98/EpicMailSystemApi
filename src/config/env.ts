import dotenv from 'dotenv';
dotenv.config();
//console.log(process.env.MONGO_URI)
const config = {
  MONGO_URI: process.env.MONGO_URI_LOCAL,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  EMAIL: process.env.EMAIL,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  CLIENT_ID: process.env.CLIENT_ID,
  REDIRECT_URI: process.env.REDIRECT_URI,
  MAIL_SERVICE: process.env.MAIL_SERVICE,
  MAIL_AUTH_TYPE: process.env.MAIL_AUTH_TYPE,
};

export default config;
