const Joi = require('joi');
const validator = require('validator');

const isValidEmail = Joi.string()
    .required()
    .custom((value, helpers) => {
        if (!validator.isEmail(value)) {
            return helpers.message('Email sai định dạng');
        }
        return value;
    })
    .messages({
        'any.required': 'Email là bắt buộc.',
        'string.empty': 'Email không được để trống.',
    });

const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const register = Joi.object({
    body: Joi.object({
        email: isValidEmail,
        password: Joi.string()
            .pattern(passwordValidator)
            .required()
            .messages({
                "string.pattern.base": "Mật khẩu phải có ít nhất 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.",
                "string.empty": "Mật khẩu không được để trống.",
                "any.required": "Mật khẩu là bắt buộc."
            }),
        fullName: Joi.string().min(5).max(50).required().messages({
            'string.empty': 'Họ và tên không được để trống.',
            'string.min': 'Họ và tên phải có ít nhất 5 ký tự.',
            'string.max': 'Họ và tên tối đa 50 ký tự.',
            'any.required': 'Họ và tên là bắt buộc.'
        }),
    }),
});

const login = Joi.object({
    body: Joi.object({
        email: isValidEmail,
        password: Joi.string().required().messages({
            'string.empty': 'Mật khẩu không được để trống.',
            'any.required': 'Mật khẩu là bắt buộc.',
        }),
    }),
});

const verify = Joi.object({
    body: Joi.object({
        email: isValidEmail,
        otp: Joi.string()
            .length(6)
            .pattern(/^[0-9]+$/)
            .required()
            .messages({
                'string.pattern.base': 'Mã OTP phải gồm 6 chữ số.',
                'string.length': 'Mã OTP phải có đúng 6 chữ số.',
                'string.empty': 'Vui lòng nhập mã OTP.',
                'any.required': 'Mã OTP là bắt buộc.'
            }),
    }),
});

const resend = Joi.object({
    body: Joi.object({
        email: isValidEmail,
    }),
});

const forgotPassword = Joi.object({
    body: Joi.object({
        email: isValidEmail,
    }),
});

const resetPassword = Joi.object({
    body: Joi.object({
        email: isValidEmail,
        otp: Joi.string()
            .length(6)
            .pattern(/^[0-9]+$/)
            .required()
            .messages({
                'string.pattern.base': 'Mã OTP phải gồm 6 chữ số.',
                'string.length': 'Mã OTP phải có đúng 6 chữ số.',
                'string.empty': 'Vui lòng nhập mã OTP.',
                'any.required': 'Mã OTP là bắt buộc.'
            }),
        newPassword: Joi.string()
            .pattern(passwordValidator)
            .required()
            .messages({
                "string.pattern.base": "Mật khẩu mới phải có ít nhất 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.",
                "string.empty": "Mật khẩu mới không được để trống.",
                "any.required": "Mật khẩu mới là bắt buộc."
            }),
    }),
});

module.exports = {
    register,
    login,
    verify,
    resend,
    forgotPassword,
    resetPassword
};