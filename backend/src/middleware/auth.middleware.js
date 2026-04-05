const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token không hợp lệ" });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: "Không có quyền truy cập (yêu cầu quyền Admin)" });
    }
};

module.exports = { protect, admin };
