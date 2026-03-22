const documentService = require('../services/document.service');

const getAll = async (req, res) => {
    try {
        const { subject } = req.query;
        const documents = await documentService.getAll(subject);
        return res.status(200).json({
            status: 'success',
            data: documents,
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
        const document = await documentService.getById(req.params.id);
        return res.status(200).json({
            status: 'success',
            data: document,
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
        const document = await documentService.create(req.body, req.user.id);
        return res.status(201).json({
            status: 'success',
            data: document,
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
        await documentService.remove(req.params.id);
        return res.status(200).json({
            status: 'success',
            message: 'Xoá tài liệu thành công',
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            status: 'error',
            message: error.message,
        });
    }
};

module.exports = { getAll, getById, create, remove };
