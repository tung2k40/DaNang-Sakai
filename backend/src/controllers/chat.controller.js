const chatService = require('../services/chat.service');

const chat = async (req, res) => {
    try {
        const { question } = req.body;
        
        if (!question) {
            return res.status(400).json({ error: 'Vui lòng cung cấp câu hỏi.' });
        }

        const answer = await chatService.chat(question);

        res.status(200).json({
            success: true,
            answer: answer
        });
    } catch (error) {
        console.error('Lỗi tại chat controller:', error);
        res.status(500).json({ error: error?.message || 'Đã xảy ra lỗi khi xử lý chat.' });
    }
};

// API nội bộ dùng để trigger việc phân tích 1 document (Ingestion)
// API này có thể được gọi bởi Admin sau khi upload file PDF.
const ingest = async (req, res) => {
    try {
        const { documentId } = req.body;
        const file = req.file; // Yêu cầu multer setup trong route

        if (!documentId || !file) {
            return res.status(400).json({ error: 'Yêu cầu documentId và file PDF.' });
        }

        const result = await chatService.ingestDocument(documentId, file.buffer);
        
        res.status(200).json({
            success: true,
            message: `Phân tích thành công, tạo ra ${result.chunksCount} vectors.`,
        });
    } catch (error) {
        console.error('Lỗi tại ingest controller:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi phân tích tài liệu.' });
    }
};

module.exports = {
    chat,
    ingest
};
