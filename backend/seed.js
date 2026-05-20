/**
 * Seed script — insert dữ liệu mẫu (documents + exams) vào MongoDB
 * Chạy: npm run seed   hoặc   node seed.js
 */

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const mongoose = require("mongoose");
const Document = require("./src/models/document.model");
const Exam = require("./src/models/exam.model");
const User = require("./src/models/user.model");

const subjects = [
  "Toán học",
  "Vật lý",
  "Hóa học",
  "Sinh học",
  "Ngữ văn",
  "Tiếng Anh",
  "Lịch sử",
  "Địa lý",
  "GDCD",
  "Tin học",
  "Công nghệ",
];
const typesDocument = ["PDF", "Word", "Excel", "PowerPoint", "Video"];
const typesExam = ["PDF", "Word", "Quiz"];

// Mô tả chi tiết, thực tế hơn cho từng dạng tài liệu
const documentVariations = [
  {
    title: "Chuyên đề nâng cao",
    desc: "Tài liệu chuyên sâu giúp học sinh nắm vững kiến thức trọng tâm, phù hợp với học sinh muốn chuẩn bị thi đại học.",
  },
  {
    title: "Bài giảng lý thuyết",
    desc: "Tổng hợp toàn bộ lý thuyết cơ bản một cách trực quan, dễ hiểu. Kèm theo sơ đồ tư duy và bảng so sánh.",
  },
  {
    title: "Hướng dẫn giải bài tập",
    desc: "Phân tích và giải chi tiết các dạng bài tập điển hình thường gặp trong đề thi. Có lời giải từng bước rõ ràng.",
  },
  {
    title: "Tổng hợp công thức",
    desc: "Sổ tay công thức rút gọn, thuận tiện cho việc tra cứu nhanh. Được phân loại theo chương, theo dạng bài.",
  },
  {
    title: "Tài liệu tham khảo",
    desc: "Cung cấp thêm kiến thức mở rộng ngoài sách giáo khoa, bổ sung các bài toán thực tế và ứng dụng.",
  },
  {
    title: "Đề cương ôn tập",
    desc: "Hệ thống toàn bộ kiến thức cần thiết cho kỳ thi học kỳ. Bao gồm phần lý thuyết, bài tập và đáp án.",
  },
  {
    title: "Bài tập trắc nghiệm",
    desc: "Bộ câu hỏi trắc nghiệm theo từng chủ đề, giúp luyện tập và kiểm tra kiến thức hiệu quả. Có đáp án chi tiết.",
  },
];

// Tên giáo viên thực tế hơn
const authors = [
  "Nguyễn Thị Hương",
  "Trần Văn Minh",
  "Lê Thị Lan",
  "Phạm Quốc Hùng",
  "Võ Thị Thu",
  "Đặng Văn Đức",
  "Bùi Thị Mai",
  "Hoàng Văn Nam",
  "Đinh Thị Hoa",
  "Lý Văn Trung",
];

// Các URL PDF miễn phí thực tế từ web (sample files)
const samplePdfUrls = [
  "https://www.w3.org/WAI/WCAG21/Techniques/pdf/pdf-sample.pdf",
  "https://www.africau.edu/images/general/sample.pdf",
  "https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-download-10-mb.pdf",
];

const statuses = ["approved", "approved", "approved", "pending", "rejected"]; // Tỉ lệ: 60% approved, 20% pending, 20% rejected

const documents = [];
const exams = [];

subjects.forEach((subject) => {
  // 15 documents per subject
  for (let i = 1; i <= 15; i++) {
    const variation = documentVariations[i % documentVariations.length];
    const grade = 10 + (i % 3); // Lớp 10, 11, 12
    const author = authors[i % authors.length];
    const status = statuses[i % statuses.length];
    const type = typesDocument[i % typesDocument.length];
    const fileUrl = type === "PDF" ? samplePdfUrls[i % samplePdfUrls.length] : "#";

    documents.push({
      title: `${variation.title} môn ${subject} - Phần ${i}`,
      type,
      subject,
      grade: `Lớp ${grade}`,
      author,
      description: `[${subject} | Lớp ${grade}] ${variation.desc}`,
      fileUrl,
      status,
    });
  }

  // 15 exams per subject
  for (let i = 1; i <= 15; i++) {
    const grade = 10 + (i % 3);
    const author = authors[(i + 3) % authors.length];
    const status = statuses[(i + 1) % statuses.length];
    const semester = i % 2 === 0 ? "Học kỳ 1" : "Học kỳ 2";
    const year = 2022 + (i % 3);

    exams.push({
      title: `Đề kiểm tra ${semester} môn ${subject} lớp ${grade} - Năm ${year}`,
      type: typesExam[i % typesExam.length],
      subject,
      grade: `Lớp ${grade}`,
      author,
      description: `Đề thi chính thức ${semester} môn ${subject} lớp ${grade} năm học ${year}-${year + 1}. Bao gồm phần trắc nghiệm và tự luận, đánh giá toàn diện kiến thức trong kỳ.`,
      fileUrl: "#",
      status,
    });
  }
});

const seed = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("[ERROR] MONGO_URI chua duoc dat trong .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("[OK] Ket noi MongoDB thanh cong!");

    await Document.deleteMany({});
    await Exam.deleteMany({});
    await User.deleteMany({});
    console.log(
      "[OK] Da xoa du lieu cu (collections documents + exams + users)",
    );

    const usersToCreate = [];
    for (let i = 1; i <= 10; i++) {
      usersToCreate.push(
        new User({
          email: `user${i}@gmail.com`,
          password: "user123",
          fullName: `Học sinh ${i}`,
          verified: true,
          role: "user",
        }),
      );
    }
    for (let i = 1; i <= 3; i++) {
      usersToCreate.push(
        new User({
          email: `admin${i}@gmail.com`,
          password: "admin123",
          fullName: `Quản trị viên ${i}`,
          verified: true,
          role: "admin",
        }),
      );
    }
    for (const u of usersToCreate) {
      await u.save();
    }
    console.log(`[OK] Da them 10 tai khoan user va 3 tai khoan admin`);

    await Document.insertMany(documents);
    const approvedDocs = documents.filter(d => d.status === 'approved').length;
    const pendingDocs = documents.filter(d => d.status === 'pending').length;
    const rejectedDocs = documents.filter(d => d.status === 'rejected').length;
    console.log(`[OK] Da them ${documents.length} tai lieu (${approvedDocs} approved | ${pendingDocs} pending | ${rejectedDocs} rejected)`);

    await Exam.insertMany(exams);
    console.log(`[OK] Da them ${exams.length} de thi`);

    console.log("[OK] Seed du lieu thanh cong!");
  } catch (error) {
    console.error("[ERROR] Loi seed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
  process.exit();
};

seed();
