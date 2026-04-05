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
const documentVariations = [
  {
    title: "Chuyên đề nâng cao",
    desc: "Tài liệu chuyên sâu giúp học sinh nắm vững kiến thức trọng tâm.",
  },
  {
    title: "Bài giảng lý thuyết",
    desc: "Tổng hợp toàn bộ lý thuyết cơ bản một cách trực quan, dễ hiểu.",
  },
  {
    title: "Hướng dẫn giải bài tập",
    desc: "Phân tích và giải chi tiết các dạng bài tập điển hình thường gặp.",
  },
  {
    title: "Tổng hợp công thức",
    desc: "Sổ tay công thức rút gọn, thuận tiện cho việc tra cứu nhanh.",
  },
  {
    title: "Tài liệu tham khảo",
    desc: "Cung cấp thêm kiến thức mở rộng ngoài sách giáo khoa.",
  },
];

const documents = [];
const exams = [];

subjects.forEach((subject) => {
  // 15 documents per subject
  for (let i = 1; i <= 15; i++) {
    const variation = documentVariations[i % documentVariations.length];
    documents.push({
      title: `${variation.title} môn ${subject} - Phần ${i}`,
      type: typesDocument[i % typesDocument.length],
      subject: subject,
      grade: `Lớp ${10 + (i % 3)}`,
      author: `Thầy/Cô ${i % 2 === 0 ? "Nguyễn" : "Trần"} Văn ${String.fromCharCode(65 + (i % 26))}`,
      description: variation.desc,
      fileUrl: "#",
    });
  }

  // 15 exams per subject
  for (let i = 1; i <= 15; i++) {
    exams.push({
      title: `Đề kiểm tra định kỳ môn ${subject} - Đề số ${i}`,
      type: typesExam[i % typesExam.length],
      subject: subject,
      grade: `Lớp ${10 + (i % 3)}`,
      author: `Thầy/Cô Phạm Thị ${String.fromCharCode(75 + (i % 15))}`,
      description: `Đề thi đánh giá năng lực môn ${subject} tập trung vào kiến thức chuẩn bị thi học kỳ.`,
      fileUrl: "#",
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
    console.log(`[OK] Da them ${documents.length} tai lieu`);

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
