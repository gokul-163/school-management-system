import dotenv from 'dotenv';
dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sms',
  JWT_SECRET: process.env.JWT_SECRET || 'dev_secret_change_me',
  COOKIE_NAME: process.env.COOKIE_NAME || 'sms_token',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
};
