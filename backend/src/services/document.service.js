const Document = require('../models/document.model');
const AppError = require('../utils/app.error');

const getAll = async (subject) => {
    const filter = subject ? { subject, status: 'approved' } : { status: 'approved' };
    const documents = await Document.find(filter).sort({ createdAt: -1 });
    return documents;
};

const getById = async (id) => {
    const document = await Document.findById(id);
    if (!document) throw new AppError('Không tìm thấy tài liệu', 404);
    return document;
};

const create = async (data, userId) => {
    const document = await Document.create({ ...data, uploadedBy: userId });
    return document;
};

const remove = async (id) => {
    const document = await Document.findByIdAndDelete(id);
    if (!document) throw new AppError('Không tìm thấy tài liệu', 404);
    return document;
};

const getByUserId = async (userId) => {
    const documents = await Document.find({ uploadedBy: userId }).sort({ createdAt: -1 });
    return documents;
};

const getPending = async () => {
    const documents = await Document.find({ status: 'pending' })
        .populate('uploadedBy', 'fullName email')
        .sort({ createdAt: -1 });
    return documents;
};

const updateStatus = async (id, status) => {
    const document = await Document.findByIdAndUpdate(id, { status }, { new: true });
    if (!document) throw new AppError('Không tìm thấy tài liệu', 404);
    return document;
};

module.exports = { getAll, getById, create, remove, getByUserId, getPending, updateStatus };
