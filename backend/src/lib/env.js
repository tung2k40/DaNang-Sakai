const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const ENV = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    CLIENT_URL: process.env.CLIENT_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    SMTP_EMAIL: process.env.SMTP_EMAIL,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
};

module.exports = {
    ENV
};