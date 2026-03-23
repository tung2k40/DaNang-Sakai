import { axiosInstance } from '../lib/axios';

export const getDocumentsAPI = async (subject) => {
    try {
        const params = subject ? { subject } : {};
        const res = await axiosInstance.get('/documents', { params });
        const list = res.data?.data;
        return Array.isArray(list) ? list : [];
    } catch (err) {
        throw err.response?.data || err;
    }
};

export const getDocumentByIdAPI = async (id) => {
    try {
        const res = await axiosInstance.get(`/documents/${id}`);
        return res.data.data;
    } catch (err) {
        throw err.response?.data || err;
    }
};

export const uploadDocumentAPI = async (formData) => {
    try {
        const res = await axiosInstance.post('/documents', formData);
        return res.data;
    } catch (err) {
        throw err.response?.data || err;
    }
};
