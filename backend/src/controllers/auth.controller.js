const authService = require('../services/auth.service');

const register = async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        const result = await authService.register(email, password, fullName);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const result = await authService.verifyOTP(email, otp);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await authService.resendOTP(email);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    register,
    verifyOTP,
    resendOTP,
    login
};