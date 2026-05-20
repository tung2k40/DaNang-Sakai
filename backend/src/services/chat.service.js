const { GoogleGenerativeAI } = require('@google/generative-ai');
const pdfParse = require('pdf-parse');
const DocumentChunk = require('../models/documentChunk.model');
const Document = require('../models/document.model');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Cấu hình models
const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-2" });
const chatModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Chia văn bản thành các đoạn nhỏ (chunks)
 */
function chunkText(text, maxWords = 200, overlap = 50) {
    const words = text.split(/\s+/);
    const chunks = [];
    for (let i = 0; i < words.length; i += (maxWords - overlap)) {
        const chunkWords = words.slice(i, i + maxWords);
        chunks.push(chunkWords.join(' '));
    }
    return chunks;
}

/**
 * Nhúng một đoạn văn bản thành Vector
 */
async function generateEmbedding(text) {
    const result = await embeddingModel.embedContent(text);
    return result.embedding.values;
}

/**
 * Đọc file PDF và lưu vào Database dưới dạng các Vector Chunks
 * Note: Hàm này nên được gọi bất đồng bộ hoặc thông qua queue trong production.
 */
async function ingestDocument(documentId, fileBuffer) {
    try {
        // 1. Trích xuất Text từ PDF
        const data = await pdfParse(fileBuffer);
        const text = data.text;
        
        if (!text || text.trim() === '') {
            throw new Error('Không thể đọc chữ từ PDF này (có thể là file ảnh scan).');
        }

        // 2. Cắt thành các chunk nhỏ
        const chunks = chunkText(text, 250, 50); // Khoảng 250 từ/chunk

        // 3. Xóa các chunk cũ của document này (nếu có update)
        await DocumentChunk.deleteMany({ documentId });

        // 4. Tạo vector cho từng chunk và lưu DB
        // Thực hiện tuần tự hoặc chunk nhỏ để không bị Rate Limit của API
        let chunkIndex = 0;
        for (const chunkText of chunks) {
            if (chunkText.trim().length < 20) continue; // Bỏ qua chunk quá ngắn
            
            const embedding = await generateEmbedding(chunkText);
            
            await DocumentChunk.create({
                documentId,
                chunkIndex,
                textContent: chunkText,
                embedding
            });
            chunkIndex++;
            
            // Tạm dừng 100ms để tránh bị rate limit (Google Free tier có limit)
            await new Promise(res => setTimeout(res, 100));
        }

        return { success: true, chunksCount: chunkIndex };
    } catch (error) {
        console.error('Lỗi khi Ingest Document:', error);
        throw error;
    }
}

/**
 * Xử lý Chat RAG: Tìm kiếm câu trả lời từ DB
 */
async function chat(userQuestion) {
    try {
        // 1. Nhúng câu hỏi của user thành Vector
        const questionVector = await generateEmbedding(userQuestion);

        // 2. Tìm kiếm trong MongoDB (Yêu cầu MongoDB Atlas M0 trở lên có cấu hình Vector Search index)
        // Lưu ý: Nếu chạy MongoDB Local không có Atlas, phần này sẽ lỗi.
        // Bạn cần vào MongoDB Atlas -> tạo Index cho collection documentchunks.
        const topChunks = await DocumentChunk.aggregate([
            {
                $vectorSearch: {
                    index: "vector_index", // Tên index tạo trên Atlas
                    path: "embedding",
                    queryVector: questionVector,
                    numCandidates: 100,
                    limit: 4 // Lấy top 4 đoạn văn bản phù hợp nhất
                }
            },
            {
                $lookup: {
                    from: "documents",
                    localField: "documentId",
                    foreignField: "_id",
                    as: "documentInfo"
                }
            },
            {
                $unwind: "$documentInfo"
            }
        ]);

        const systemContext = `Bạn là một trợ lý AI thông minh và thân thiện của hệ thống "Danang_Sakai" (Mạng lưới chia sẻ tài liệu, thi trực tuyến và giáo dục). 
Vai trò của bạn là giải đáp thắc mắc của người dùng về trang web, hỗ trợ học tập, và trả lời các câu hỏi dựa trên kiến thức được cung cấp. Không bao giờ nói rằng bạn không biết trang web này.`;

        let prompt = `${systemContext}\n\n`;

        if (topChunks && topChunks.length > 0) {
            let contextText = topChunks.map((chunk, idx) => {
                return `[Nguồn ${idx + 1} - Tài liệu: ${chunk.documentInfo.title}]: ${chunk.textContent}`;
            }).join('\n\n');

            prompt += `Dựa vào các NGỮ CẢNH ĐƯỢC TRÍCH XUẤT từ tài liệu dưới đây, hãy trả lời CÂU HỎI của người dùng.
Luôn CÓ TRÍCH DẪN NGUỒN (VD: "Theo Nguồn 1...", "Từ tài liệu...") nếu thông tin lấy từ ngữ cảnh.
Nếu trong Ngữ cảnh không có thông tin, hãy dựa vào kiến thức của bạn để trả lời nhưng nhắc nhở người dùng rằng thông tin này không có trong tài liệu của hệ thống.

NGỮ CẢNH ĐƯỢC TRÍCH XUẤT:
${contextText}\n\n`;
        }

        prompt += `CÂU HỎI CỦA NGƯỜI DÙNG:
${userQuestion}`;

        // Sinh câu trả lời
        const result = await chatModel.generateContent(prompt);
        return result.response.text();

    } catch (error) {
        console.error('Lỗi khi Chat:', error);
        
        // Nếu lỗi do $vectorSearch (ví dụ chưa tạo index), fallback về dot product đơn giản hoặc trả lời không cần context
        if (error?.message?.includes('$vectorSearch')) {
            console.warn("Chưa cấu hình Vector Index trên MongoDB Atlas! AI sẽ trả lời không cần RAG Context.");
            const fallbackPrompt = `Bạn là một trợ lý AI thông minh của hệ thống "Danang_Sakai". 
Câu hỏi của người dùng: ${userQuestion}`;
            const fallbackResult = await chatModel.generateContent(fallbackPrompt);
            return fallbackResult.response.text();
        }
        
        throw error;
    }
}

module.exports = {
    ingestDocument,
    chat,
    generateEmbedding
};
