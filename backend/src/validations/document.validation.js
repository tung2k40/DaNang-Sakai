const Joi = require('joi');

const DOCUMENT_TYPES = ['PDF', 'Word', 'Excel', 'PowerPoint', 'Video'];

const create = Joi.object({
    body: Joi.object({
        title: Joi.string().min(5).max(200).required().messages({
            'string.empty': 'Tiêu đề không được để trống',
            'any.required': 'Tiêu đề là bắt buộc',
        }),
        type: Joi.string().valid(...DOCUMENT_TYPES).required().messages({
            'any.only': `Loại tài liệu phải là: ${DOCUMENT_TYPES.join(', ')}`,
            'any.required': 'Loại tài liệu là bắt buộc',
        }),
        subject: Joi.string().min(2).max(100).required().messages({
            'string.empty': 'Môn học không được để trống',
            'any.required': 'Môn học là bắt buộc',
        }),
        grade: Joi.string().max(20).optional(),
        author: Joi.string().min(3).max(100).required().messages({
            'string.empty': 'Tên tác giả không được để trống',
            'any.required': 'Tác giả là bắt buộc',
        }),
        description: Joi.string().min(10).max(1000).required().messages({
            'string.empty': 'Mô tả không được để trống',
            'any.required': 'Mô tả là bắt buộc',
        }),
        fileUrl: Joi.string().optional().allow(''),
    }),
});

module.exports = { create };
