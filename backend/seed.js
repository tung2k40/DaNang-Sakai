/**
 * Seed script — insert dữ liệu mẫu (documents + exams) vào MongoDB
 * Chạy: npm run seed   hoặc   node seed.js
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const Document = require('./src/models/document.model');
const Exam = require('./src/models/exam.model');

const documents = [
    // Toán học
    {
        title: 'Chuyên đề Hàm số và đồ thị lớp 12',
        type: 'PDF',
        subject: 'Toán học',
        grade: 'Lớp 12',
        author: 'Thầy Phạm Minh Hùng',
        description: 'Tổng hợp công thức, tính đơn điệu, cực trị và tiệm cận của hàm số. Có ví dụ minh họa chi tiết.',
        fileUrl: '#',
    },
    {
        title: 'Bài giảng Tích phân và ứng dụng',
        type: 'Slide',
        subject: 'Toán học',
        grade: 'Lớp 12',
        author: 'Cô Nguyễn Thị Hạnh',
        description: 'Bài giảng trực quan về tích phân, cách tính diện tích hình phẳng và thể tích khối tròn xoay.',
        fileUrl: '#',
    },
    {
        title: 'Video hướng dẫn Hình học không gian Oxyz',
        type: 'Video',
        subject: 'Toán học',
        grade: 'Lớp 12',
        author: 'Thầy Lê Văn Phúc',
        description: 'Giải thích các dạng bài về khoảng cách, góc và phương trình mặt phẳng trong không gian.',
        fileUrl: '#',
    },
    {
        title: 'Lý thuyết và bài tập Tổ hợp - Xác suất',
        type: 'PDF',
        subject: 'Toán học',
        grade: 'Lớp 11',
        author: 'Thầy Đỗ Minh Quân',
        description: 'Tổng hợp công thức, dạng bài phổ biến và mẹo giải nhanh phần tổ hợp - xác suất.',
        fileUrl: '#',
    },
    {
        title: 'Slide Hướng dẫn Giải phương trình lượng giác',
        type: 'Slide',
        subject: 'Toán học',
        grade: 'Lớp 11',
        author: 'Cô Trần Mỹ Duyên',
        description: 'Slide trình bày phương pháp giải phương trình lượng giác và bài tập luyện tập cơ bản.',
        fileUrl: '#',
    },
    {
        title: 'Video Bất đẳng thức và cực trị',
        type: 'Video',
        subject: 'Toán học',
        grade: 'Lớp 12',
        author: 'Thầy Nguyễn Hoàng Nam',
        description: 'Giải thích các bất đẳng thức quan trọng và bài tập minh họa dễ hiểu, sinh động.',
        fileUrl: '#',
    },
    // Vật lý
    {
        title: 'Tổng hợp công thức Cơ học - Lớp 10',
        type: 'PDF',
        subject: 'Vật lý',
        grade: 'Lớp 10',
        author: 'Thầy Trần Quốc Bảo',
        description: 'Toàn bộ công thức cơ học: chuyển động thẳng, lực, công và năng lượng. Dễ tra cứu khi ôn thi.',
        fileUrl: '#',
    },
    {
        title: 'Slide Điện học - Mạch điện xoay chiều',
        type: 'Slide',
        subject: 'Vật lý',
        grade: 'Lớp 12',
        author: 'Cô Lê Thị Ánh',
        description: 'Bài giảng mạch RLC, cộng hưởng điện, máy biến áp. Có hình ảnh minh họa rõ ràng.',
        fileUrl: '#',
    },
    {
        title: 'Video thí nghiệm Quang học - Khúc xạ ánh sáng',
        type: 'Video',
        subject: 'Vật lý',
        grade: 'Lớp 11',
        author: 'Thầy Nguyễn Anh Khoa',
        description: 'Video thực hành thí nghiệm về hiện tượng khúc xạ, phản xạ toàn phần và lăng kính.',
        fileUrl: '#',
    },
    {
        title: 'Chuyên đề Dao động và Sóng cơ học',
        type: 'PDF',
        subject: 'Vật lý',
        grade: 'Lớp 12',
        author: 'Cô Phạm Thị Hoa',
        description: 'Lý thuyết và bài tập dao động điều hòa, con lắc đơn, con lắc lò xo và sóng cơ.',
        fileUrl: '#',
    },
    {
        title: 'Slide Hạt nhân nguyên tử và Phóng xạ',
        type: 'Slide',
        subject: 'Vật lý',
        grade: 'Lớp 12',
        author: 'Thầy Bùi Đức Minh',
        description: 'Cấu tạo hạt nhân, phóng xạ, phản ứng hạt nhân và ứng dụng năng lượng nguyên tử.',
        fileUrl: '#',
    },
    {
        title: 'Video Nhiệt động lực học và Khí lý tưởng',
        type: 'Video',
        subject: 'Vật lý',
        grade: 'Lớp 10',
        author: 'Thầy Võ Thành Long',
        description: 'Giải thích các định luật chất khí, quá trình đẳng nhiệt, đẳng áp, đẳng tích sinh động.',
        fileUrl: '#',
    },
];

const exams = [
    // Toán học
    {
        title: 'Đề thi Toán HK1 Lớp 12 - Năm học 2024-2025',
        type: 'PDF',
        subject: 'Toán học',
        grade: 'Lớp 12',
        author: 'Thầy Nguyễn Văn An',
        description: 'Đề thi cuối học kỳ 1 gồm 50 câu trắc nghiệm và 5 câu tự luận. Có đáp án chi tiết.',
        fileUrl: '#',
    },
    {
        title: 'Đề thi thử tốt nghiệp THPT môn Toán',
        type: 'Word',
        subject: 'Toán học',
        grade: 'Lớp 12',
        author: 'Cô Trần Thị Bình',
        description: 'Đề thi thử bám sát cấu trúc Bộ GD&ĐT, có lời giải và thang điểm chuẩn.',
        fileUrl: '#',
    },
    {
        title: 'Quiz ôn tập Giải tích lớp 12',
        type: 'Quiz',
        subject: 'Toán học',
        grade: 'Lớp 12',
        author: 'Thầy Lê Văn Cường',
        description: 'Bộ câu hỏi trắc nghiệm 100 câu về hàm số, tích phân, mũ và logarit.',
        fileUrl: '#',
    },
    {
        title: 'Đề thi chuyên đề Tích phân - Nâng cao',
        type: 'PDF',
        subject: 'Toán học',
        grade: 'Lớp 12',
        author: 'Thầy Nguyễn Văn Hưng',
        description: 'Đề gồm 40 câu nâng cao về tích phân, có đáp án chi tiết kèm hướng dẫn giải nhanh.',
        fileUrl: '#',
    },
    {
        title: 'Đề thi chọn học sinh giỏi cấp tỉnh - Toán',
        type: 'Word',
        subject: 'Toán học',
        grade: 'Lớp 12',
        author: 'Cô Lê Thị Mai Phương',
        description: 'Đề thi chuyên sâu kiểm tra tư duy Toán học, có phần tự luận và bài toán thực tế.',
        fileUrl: '#',
    },
    {
        title: 'Quiz trắc nghiệm Toán THPT tổng hợp',
        type: 'Quiz',
        subject: 'Toán học',
        grade: 'Lớp 12',
        author: 'Thầy Phan Đức Tài',
        description: 'Quiz trực tuyến gồm 50 câu hỏi ngẫu nhiên, có tính điểm và hiển thị kết quả.',
        fileUrl: '#',
    },
    // Vật lý
    {
        title: 'Đề thi Vật lý HK2 Lớp 12 - Năm 2025',
        type: 'PDF',
        subject: 'Vật lý',
        grade: 'Lớp 12',
        author: 'Thầy Hoàng Minh Đức',
        description: 'Đề thi cuối kỳ 2 với 40 câu trắc nghiệm bao phủ cả năm học. Kèm đáp án và giải thích.',
        fileUrl: '#',
    },
    {
        title: 'Đề thi thử THPT môn Vật lý - Đề số 1',
        type: 'Word',
        subject: 'Vật lý',
        grade: 'Lớp 12',
        author: 'Cô Nguyễn Thu Hà',
        description: 'Đề thi thử chuẩn cấu trúc BGD, tập trung vào điện xoay chiều và dao động.',
        fileUrl: '#',
    },
    {
        title: 'Quiz Điện học và Từ trường lớp 11',
        type: 'Quiz',
        subject: 'Vật lý',
        grade: 'Lớp 11',
        author: 'Thầy Trần Bá Lộc',
        description: 'Bộ 60 câu trắc nghiệm điện học, từ trường và cảm ứng điện từ. Phân chia theo mức độ.',
        fileUrl: '#',
    },
    {
        title: 'Đề kiểm tra 1 tiết Cơ học - Lớp 10',
        type: 'PDF',
        subject: 'Vật lý',
        grade: 'Lớp 10',
        author: 'Cô Phạm Minh Châu',
        description: 'Đề kiểm tra 45 phút phần Cơ học lớp 10, gồm 30 câu trắc nghiệm và 2 bài tự luận.',
        fileUrl: '#',
    },
    {
        title: 'Bộ đề thi chọn HSG môn Vật lý tỉnh Đà Nẵng',
        type: 'Word',
        subject: 'Vật lý',
        grade: 'Lớp 12',
        author: 'Thầy Võ Quang Hào',
        description: 'Bộ đề tuyển chọn HSG cấp tỉnh từ năm 2020-2025 kèm hướng dẫn giải chi tiết.',
        fileUrl: '#',
    },
    {
        title: 'Quiz Quang học và Hạt nhân lớp 12',
        type: 'Quiz',
        subject: 'Vật lý',
        grade: 'Lớp 12',
        author: 'Thầy Lê Bá Cường',
        description: '50 câu hỏi trắc nghiệm về quang học và vật lý hạt nhân, phân loại theo độ khó.',
        fileUrl: '#',
    },
];

const seed = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error('[ERROR] MONGO_URI chua duoc dat trong .env');
        process.exit(1);
    }

    try {
        await mongoose.connect(uri);
        console.log('[OK] Ket noi MongoDB thanh cong!');

        await Document.deleteMany({});
        await Exam.deleteMany({});
        console.log('[OK] Da xoa du lieu cu (collections documents + exams)');

        await Document.insertMany(documents);
        console.log(`[OK] Da them ${documents.length} tai lieu`);

        await Exam.insertMany(exams);
        console.log(`[OK] Da them ${exams.length} de thi`);

        console.log('[OK] Seed du lieu thanh cong!');
    } catch (error) {
        console.error('[ERROR] Loi seed:', error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.connection.close();
    }
    process.exit();
};

seed();
