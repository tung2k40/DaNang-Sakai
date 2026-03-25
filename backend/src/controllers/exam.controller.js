const examService = require('../services/exam.service');
const { uploadFileToSupabase } = require('../services/supabase.service');

const getAll = async (req, res) => {
    try {
        const { subject } = req.query;
        const exams = await examService.getAll(subject);
        return res.status(200).json({
            status: 'success',
            data: exams,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            status: 'error',
            message: error.message,
        });
    }
};

const getById = async (req, res) => {
    try {
        const exam = await examService.getById(req.params.id);
        return res.status(200).json({
            status: 'success',
            data: exam,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            status: 'error',
            message: error.message,
        });
    }
};

const create = async (req, res) => {
    try {
        if (req.file) {
            const supabaseFileUrl = await uploadFileToSupabase(
                req.file.buffer,
                req.file.originalname,
                req.file.mimetype
            );
            req.body.fileUrl = supabaseFileUrl;
        }
        const exam = await examService.create(req.body, req.user.id);
        return res.status(201).json({
            status: 'success',
            data: exam,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            status: 'error',
            message: error.message,
        });
    }
};

const remove = async (req, res) => {
    try {
        await examService.remove(req.params.id);
        return res.status(200).json({
            status: 'success',
            message: 'Xoá đề thi thành công',
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            status: 'error',
            message: error.message,
        });
    }
};

const getMine = async (req, res) => {
    try {
        const exams = await examService.getByUserId(req.user.id);
        return res.status(200).json({
            status: 'success',
            data: exams,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            status: 'error',
            message: error.message,
        });
    }
};

module.exports = { getAll, getById, create, remove, getMine };
