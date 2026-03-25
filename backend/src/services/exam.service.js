const Exam = require('../models/exam.model');
const AppError = require('../utils/app.error');

const getAll = async (subject) => {
    const filter = subject ? { subject } : {};
    const exams = await Exam.find(filter).sort({ createdAt: -1 });
    return exams;
};

const getById = async (id) => {
    const exam = await Exam.findById(id);
    if (!exam) throw new AppError('Không tìm thấy đề thi', 404);
    return exam;
};

const create = async (data, userId) => {
    const exam = await Exam.create({ ...data, uploadedBy: userId });
    return exam;
};

const remove = async (id) => {
    const exam = await Exam.findByIdAndDelete(id);
    if (!exam) throw new AppError('Không tìm thấy đề thi', 404);
    return exam;
};

const getByUserId = async (userId) => {
    const exams = await Exam.find({ uploadedBy: userId }).sort({ createdAt: -1 });
    return exams;
};

module.exports = { getAll, getById, create, remove, getByUserId };
