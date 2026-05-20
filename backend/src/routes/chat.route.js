const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const authMiddleware = require('../middleware/auth.middleware');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Public hoặc Private tuỳ thuộc vào requirement
// Hiện tại set auth để chỉ user đăng nhập mới được chat
router.post('/', authMiddleware.protect, chatController.chat);

// API upload tài liệu và tạo embedding (Admin only hoặc tùy chọn)
router.post('/ingest', authMiddleware.protect, upload.single('file'), chatController.ingest);

module.exports = router;
