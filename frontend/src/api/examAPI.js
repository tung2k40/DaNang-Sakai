import { axiosInstance } from '../lib/axios';

export const getExamsAPI = async (subject) => {
    try {
        const params = subject ? { subject } : {};
        const res = await axiosInstance.get('/exams', { params });
        const list = res.data?.data;
        return Array.isArray(list) ? list : [];
    } catch (err) {
        throw err.response?.data || err;
    }
};

export const getExamByIdAPI = async (id) => {
    try {
        const res = await axiosInstance.get(`/exams/${id}`);
        return res.data.data;
    } catch (err) {
        throw err.response?.data || err;
    }
};
