const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Đảm bảo thư mục uploads tồn tại
// Dùng Memory Storage thay cho Disk Storage để lấy Buffer đẩy lên Firebase
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    // Chấp nhận file pdf, doc, docx, ppt, pptx, txt, hình ảnh, mp4...
    const allowedMimeTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv',
        'text/plain',
        'video/mp4',
        'image/jpeg',
        'image/png',
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Loại file không được hỗ trợ!'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB
    },
    fileFilter: fileFilter,
});

module.exports = upload;
