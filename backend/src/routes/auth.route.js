const express = require('express');
const { validate } = require('../middleware/validate.middleware');
const authValidator = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const rateLimit = require('../middleware/rate-limit.middleware');

const router = express.Router();

const registerLimiter = rateLimit(10, 60 * 60 * 1000); // Max 10 đăng ký / giờ
const loginLimiter = rateLimit(30, 15 * 60 * 1000);   // Max 30 đăng nhập / 15 phút
const otpLimiter = rateLimit(5, 5 * 60 * 1000);      // Max 5 gửi lại OTP / 5 phút
const forgotLimiter = rateLimit(5, 60 * 60 * 1000);  // Max 5 quên mật khẩu / giờ


router.post(
    '/register',
    registerLimiter,
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
    otpLimiter,
    validate(authValidator.resend),
    authController.resendOTP
);

router.post(
    '/login',
    loginLimiter,
    validate(authValidator.login),
    authController.login
);

router.post(
    '/sso',
    loginLimiter,
    authController.ssoLogin
);

router.get(
    '/me',
    protect,
    authController.getMe
)

router.get(
    '/logout',
    authController.logout
)

router.post(
    '/forgot-password',
    forgotLimiter,
    validate(authValidator.forgotPassword),
    authController.forgotPassword
);

router.post(
    '/reset-password',
    forgotLimiter,
    validate(authValidator.resetPassword),
    authController.resetPassword
);

module.exports = router;
