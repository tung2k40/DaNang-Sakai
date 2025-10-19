const express = require('express');
const { validate } = require('../middleware/validate');
const authValidator = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post(
    '/register',
    validate(authValidator.register),
    authController.register
);

router.post(
    '/verify-otp',
    validate(authValidator.verify),
    authController.verifyOTP
);

router.post(
    '/resend-otp',
    validate(authValidator.resend),
    authController.resendOTP
);

router.post(
    '/login',
    validate(authValidator.login),
    authController.login
);

module.exports = router