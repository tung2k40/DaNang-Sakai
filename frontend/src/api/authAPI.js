import { axiosInstance } from "../lib/axios";

export const loginAPI = async ({ email, password }) => {
    try {
        const res = await axiosInstance.post("/auth/login", { email, password });
        return res.data;
    } catch (err) {
        // throw err.response?.data?.message || "Đăng nhập thất bại!";
        throw err.response?.data || err;
    }
};

export const registerAPI = async ({ email, password, fullName }) => {
    try {
        const res = await axiosInstance.post("/auth/register", {
            email,
            password,
            fullName,
        });
        return res.data;
    } catch (err) {
        // throw err.response?.data?.message || "Đăng ký thất bại!";
        throw err.response?.data || err;
    }
};

export const verifyOTP = async ({ email, otp }) => {
    try {
        const res = await axiosInstance.post(
            "/auth/verify-otp",
            { email, otp }
        );
        return res.data;
    } catch (err) {
        throw err.response?.data || err;
    }
};

export const resendOTP = async (email) => {
    try {
        const res = await axiosInstance.post("/auth/resend-otp", { email });
        return res.data;
    } catch (err) {
        // throw err.response?.data?.message || "Không thể gửi lại OTP!";
        throw err.response?.data || err;
    }
};

export const logoutAPI = async () => {
    try {
        const res = await axiosInstance.get("/auth/logout");
        return res.data;
    } catch (err) {
        // throw err.response?.data?.message || "Đăng xuất thất bại!";
        throw err.response?.data || err;
    }
};

export const getMeAPI = async () => {
    try {
        const res = await axiosInstance.get("/auth/me");
        return res.data.user;
    } catch (err) {
        return null;
    }
};
