import { axiosInstance } from '../lib/axios';

export const loginAPI = async (formData) => {
    try {
        const { email, password } = formData;
        if (!email || !password) {
            throw new Error('Email và password không được để trống');
        }

        const response = await axiosInstance.post(
            '/auth/login',
            {
                email,
                password,
            }
        )

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const logoutAPI = async () => {
    try {

        const response = await axiosInstance.get(
            '/auth/logout',
        )
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const registerAPI = async (email, password, fullName) => {
    try {
        if (!email || password) {
            throw new Error('Email và password không được để trống');
        }

        const response = await axiosInstance.post(
            '/auth/register',
            {
                email,
                password,
                fullName,
            }
        )

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const verifyOTP = async (email, otp) => {
    try {
        if (!email || password) {
            throw new Error('Email và password không được để trống');
        }

        const response = await axiosInstance.post(
            '/auth/verify-otp',
            {
                email,
                otp,
            }
        )

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const resendOTP = async (email) => {
    try {
        if (!email || password) {
            throw new Error('Email và password không được để trống');
        }

        const response = await axiosInstance.post(
            '/auth/resend-otp',
            {
                email,
                otp,
            }
        )

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const getMeAPI = async () => {
    try {
        const res = await axiosInstance.get("/auth/me");
        return res.data.user;
    } catch (err) {
        return null;
    }
}