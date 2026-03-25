const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const ENV = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    CLIENT_URL: process.env.CLIENT_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
};

module.exports = {
    ENV
};