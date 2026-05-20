const Document = require('../models/document.model');
const AppError = require('../utils/app.error');

const getAll = async (subject) => {
    const filter = subject ? { subject, status: 'approved' } : { status: 'approved' };
    const documents = await Document.find(filter).sort({ createdAt: -1 });
    return documents;
};

const getById = async (id) => {
    const document = await Document.findById(id);
    if (!document) throw new AppError('Không tìm thấy tài liệu', 404);
    return document;
};

const create = async (data, userId) => {
    const document = await Document.create({ ...data, uploadedBy: userId });
    return document;
};

const remove = async (id) => {
    const document = await Document.findByIdAndDelete(id);
    if (!document) throw new AppError('Không tìm thấy tài liệu', 404);
    return document;
};

const getByUserId = async (userId) => {
    const documents = await Document.find({ uploadedBy: userId }).sort({ createdAt: -1 });
    return documents;
};

const getPending = async () => {
    const documents = await Document.find({ status: 'pending' })
        .populate('uploadedBy', 'fullName email')
        .sort({ createdAt: -1 });
    return documents;
};

const updateStatus = async (id, status) => {
    const document = await Document.findByIdAndUpdate(id, { status }, { new: true });
    if (!document) throw new AppError('Không tìm thấy tài liệu', 404);
    return document;
};

const aiReview = async (id) => {
    const document = await Document.findById(id).populate('uploadedBy', 'fullName email');
    if (!document) throw new AppError('Không tìm thấy tài liệu', 404);

    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Danh sách model fallback theo thứ tự ưu tiên (từ xịn → nhẹ)
    const modelPriority = [
        'gemini-2.5-flash',
        'gemini-2.0-flash-lite',
        'gemini-2.0-flash-lite-001',
        'gemini-flash-lite-latest',
        'gemini-flash-latest',
    ];

    // Hàm kiểm tra lỗi có thể retry bằng model khác không (503 quá tải, 429 hết quota)
    const isRetriableError = (err) => {
        const msg = err?.message || '';
        return msg.includes('503') || msg.includes('Service Unavailable') ||
               msg.includes('high demand') || msg.includes('429') ||
               msg.includes('Too Many Requests') || msg.includes('quota');
    };

    const prompt = `
Bạn là một chuyên gia kiểm duyệt nội dung giáo dục cho hệ thống chia sẻ tài liệu học tập "Danang_Sakai".
Hãy phân tích thông tin tài liệu sau và đưa ra đánh giá chi tiết.

THÔNG TIN TÀI LIỆU:
- Tiêu đề: ${document.title}
- Môn học: ${document.subject}
- Lớp: ${document.grade || 'Không rõ'}
- Loại file: ${document.type}
- Tác giả: ${document.author}
- Mô tả: ${document.description}

Hãy trả lời theo định dạng JSON thuần túy (không có markdown, không có backtick):
{
  "score": <số từ 1-10, điểm chất lượng tổng thể>,
  "recommendation": <"DUYỆT" hoặc "TỪ CHỐI" hoặc "CẦN XEM XÉT">,
  "subjectMatch": <true hoặc false, tài liệu có khớp với môn học khai báo không>,
  "qualityAnalysis": "<nhận xét ngắn gọn về chất lượng nội dung, 1-2 câu>",
  "riskAnalysis": "<đánh giá rủi ro nội dung, 1-2 câu>",
  "reason": "<lý do đưa ra khuyến nghị, 2-3 câu>"
}`;

    let lastError = null;

    // Thử lần lượt từng model, nếu bị 503 thì chuyển sang model tiếp theo
    for (const modelName of modelPriority) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent(prompt);
            let text = result.response.text().trim();
            text = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
            const analysis = JSON.parse(text);
            console.log(`[AI Review] Dùng model: ${modelName}`);
            return { document, analysis };
        } catch (err) {
            if (isRetriableError(err)) {
                console.warn(`[AI Review] Model ${modelName} lỗi, thử tiếp: ${err.message.slice(0, 80)}`);
                lastError = err;
                await new Promise(res => setTimeout(res, 800));
                continue;
            }
            throw err;
        }
    }

    // Đã thử hết tất cả model mà vẫn lỗi
    throw new AppError('Google AI đang quá tải, vui lòng thử lại sau ít phút.', 503);
};

module.exports = { getAll, getById, create, remove, getByUserId, getPending, updateStatus, aiReview };
