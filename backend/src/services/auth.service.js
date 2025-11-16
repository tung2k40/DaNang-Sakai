const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTP } = require('../services/email.service');
const { ENV } = require('../lib/env');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const register = async (email, password, fullName) => {
    const exists = await User.findOne({ email });
    if (exists) throw new Error('Email đã tồn tại');

    const otp = generateOTP();
    const otpExpire = Date.now() + 5 * 60 * 1000;

    const user = new User({
        email,
        password,
        fullName,
        otp,
        otpExpire: otpExpire,
    });

    await user.save();
    await sendOTP(email, otp);

    return {
        message: 'OTP đã gửi đến email của bạn, vui lòng kiểm tra hộp thư'
    };

};

const verifyOTP = async (email, otp) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Không tìm thấy người dùng');

    if (user.verified) throw new Error('Tài khoản đã được xác minh');
    if (user.otp !== otp) throw new Error('OTP không đúng');
    if (user.otpExpire < Date.now()) throw new Error('OTP đã hết hạn');

    user.verified = true;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    return {
        message: 'Xác minh tài khoản thành công'
    };

}

const resendOTP = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Không tìm thấy người dùng');
    if (user.verified) throw new Error('Tài khoản đã được xác minh');

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000;
    await user.save();

    await sendOTP(email, otp);

    return { message: 'OTP mới đã được gửi đến email của bạn, vui lòng kiểm tra hộp thư' };
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Không tìm thấy người dùng');
    if (!user.verified) throw new Error('Tài khoản chưa được xác minh');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Mật khẩu không đúng');

    const payLoad = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
    };

    const token = jwt.sign(
        payLoad,
        ENV.JWT_SECRET,
        { expiresIn: ENV.JWT_EXPIRES_IN || '30m' }
    );

    return { token, user };
};

module.exports = {
    register,
    verifyOTP,
    resendOTP,
    login
};