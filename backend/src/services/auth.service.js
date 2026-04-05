const User = require('../models/user.model');
const PendingUser = require('../models/pendingUser.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTP } = require('../services/email.service');
const { ENV } = require('../lib/env');
const AppError = require('../utils/app.error');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const register = async (email, password, fullName) => {
    const exists = await User.findOne({ email });
    if (exists) throw new AppError("Email đã tồn tại", 400);

    const otp = generateOTP();

    // Xóa những bản nháp cũ nếu người dùng nhấn gửi lại OTP bằng cách back ra màn hình đăng ký
    await PendingUser.deleteMany({ email });

    const pendingUser = new PendingUser({
        email,
        password,
        fullName,
        otp,
    });

    try {
        await sendOTP(email, otp);
        await pendingUser.save(); // Chỉ lưu nháp sau khi GỬI MAIL THÀNH CÔNG
    } catch (error) {
        throw new AppError("Không thể gửi email OTP, vui lòng kiểm tra lại email.", 500);
    }

    return { message: "OTP đã gửi đến email của bạn, vui lòng kiểm tra hộp thư" };
};

const verifyOTP = async (email, otp) => {
    const pendingUser = await PendingUser.findOne({ email });
    if (!pendingUser) throw new AppError("Không tìm thấy yêu cầu đăng ký hoặc mã đã quá 5 phút!");
    if (pendingUser.otp !== otp) throw new AppError("OTP không đúng!");

    const user = new User({
        email: pendingUser.email,
        password: pendingUser.password, // Mongoose schema pre('save') sẽ tự động mã hóa nó
        fullName: pendingUser.fullName,
        verified: true,
    });

    await user.save();
    await PendingUser.deleteMany({ email }); // Xóa bản nháp sau khi thành công

    return { message: "Xác minh tài khoản thành công" };
};

const resendOTP = async (email) => {
    const pendingUser = await PendingUser.findOne({ email });
    if (!pendingUser) throw new AppError("Không tìm thấy yêu cầu đăng ký hoặc mã đã hết hạn. Vui lòng đăng ký lại.");

    pendingUser.otp = generateOTP();
    pendingUser.createdAt = Date.now(); // Reset lại thời gian sống 5 phút
    
    try {
        await sendOTP(email, pendingUser.otp);
        await pendingUser.save();
    } catch (error) {
        throw new AppError("Không thể gửi email OTP.", 500);
    }

    return { message: "OTP mới đã được gửi đến email của bạn" };
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new AppError("Không tìm thấy người dùng");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new AppError("Mật khẩu không đúng");

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
        },
        ENV.JWT_SECRET,
        { expiresIn: ENV.JWT_EXPIRES_IN || "30m" }
    );

    return { token, user };
};

const forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new AppError("Tài khoản không tồn tại trong hệ thống", 404);

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000;
    await user.save();

    try {
        await sendOTP(email, otp);
    } catch (error) {
        throw new AppError("Không thể gửi email khôi phục, vui lòng thử lại sau.", 500);
    }

    return { message: "Mã xác nhận khôi phục mật khẩu đã được gửi đến email của bạn." };
};

const resetPassword = async (email, otp, newPassword) => {
    const user = await User.findOne({ email });
    if (!user) throw new AppError("Tài khoản không tồn tại", 404);
    if (!user.otp || user.otp !== otp) throw new AppError("Mã OTP không hợp lệ hoặc đã qua sử dụng!", 400);
    if (user.otpExpire < Date.now()) throw new AppError("Mã OTP đã hết hạn!", 400);

    user.password = newPassword;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    return { message: "Đặt lại mật khẩu thành công. Bạn có thể đăng nhập bằng mật khẩu mới!" };
};

module.exports = {
    register,
    verifyOTP,
    resendOTP,
    login,
    forgotPassword,
    resetPassword,
};
