import { motion } from "framer-motion";

function ExamSection({ subject }) {
  const exams = [
    {
      id: 1,
      title: "Đề thi Toán học HK1 lớp 12 - Năm 2024",
      type: "PDF",
      author: "Thầy Nguyễn Văn A",
      date: "15/10/2025",
      description:
        "Đề thi cuối học kỳ 1 gồm 50 câu trắc nghiệm và 5 câu tự luận. Có đáp án chi tiết giúp ôn luyện hiệu quả.",
      link: "#",
    },
    {
      id: 2,
      title: "Đề thi thử tốt nghiệp THPT - Toán học",
      type: "Word",
      author: "Cô Trần Thị B",
      date: "12/10/2025",
      description:
        "Đề thi thử bám sát cấu trúc Bộ GD&ĐT, có lời giải và thang điểm chuẩn.",
      link: "#",
    },
    {
      id: 3,
      title: "Bộ câu hỏi trắc nghiệm ôn tập cuối kỳ",
      type: "Quiz",
      author: "Thầy Lê Văn C",
      date: "05/10/2025",
      description:
        "Tổng hợp hơn 100 câu trắc nghiệm chọn lọc, giúp học sinh rèn luyện và củng cố kiến thức trọng tâm.",
      link: "#",
    },
    {
      id: 4,
      title: "Đề thi chuyên đề Tích phân - Nâng cao",
      type: "PDF",
      author: "Thầy Nguyễn Văn Hưng",
      date: "03/10/2025",
      description:
        "Đề gồm 40 câu nâng cao về tích phân, có đáp án chi tiết kèm hướng dẫn giải nhanh.",
      link: "#",
    },
    {
      id: 5,
      title: "Đề thi chọn học sinh giỏi cấp trường",
      type: "Word",
      author: "Cô Lê Thị Mai",
      date: "28/09/2025",
      description:
        "Đề thi chuyên sâu kiểm tra tư duy Toán học, có phần tự luận và bài toán thực tế.",
      link: "#",
    },
    {
      id: 6,
      title: "Quiz luyện tập trắc nghiệm Toán THPT",
      type: "Quiz",
      author: "Thầy Phan Đức Tài",
      date: "20/09/2025",
      description:
        "Quiz trực tuyến gồm 50 câu hỏi ngẫu nhiên, có tính điểm và hiển thị kết quả sau khi làm.",
      link: "#",
    },
  ];

  return (
    <div className="relative flex flex-col items-center mt-10">
      {/* Tiêu đề môn học */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute -top-5 text-blue-700 text-4xl font-extrabold px-10 py-1 bg-blue-100 rounded-full border border-blue-300 shadow-md"
      >
        {subject}
      </motion.div>

      {/* Khung chính */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="p-8 bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-6xl mt-10"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center flex items-center justify-center gap-2">
          <i className="fa-solid fa-file-lines text-blue-500 text-3xl"></i>
          Đề thi học tập
        </h2>

        {/* Danh sách đề thi */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {exams.map((exam, index) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-blue-200 transition-all duration-300 flex flex-col justify-between h-[270px]"
            >
              {/* Badge loại đề */}
              <span
                className={`absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1 rounded-full border text-[13px] font-semibold shadow-sm ${
                  exam.type === "PDF"
                    ? "bg-red-50 border-red-300 text-red-600"
                    : exam.type === "Word"
                    ? "bg-indigo-50 border-indigo-300 text-indigo-600"
                    : "bg-emerald-50 border-emerald-300 text-emerald-600"
                }`}
              >
                <i
                  className={`fa-solid ${
                    exam.type === "PDF"
                      ? "fa-file-pdf"
                      : exam.type === "Word"
                      ? "fa-file-word"
                      : "fa-question-circle"
                  }`}
                ></i>
                {exam.type}
              </span>

              {/* Nội dung đề thi */}
              <div className="text-center mt-3">
                <h3 className="text-blue-700 font-semibold text-base mb-2 line-clamp-2">
                  {exam.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 text-center line-clamp-2">
                  {exam.description}
                </p>

                <div className="flex justify-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <i className="fa-solid fa-user text-blue-600"></i>
                    {exam.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="fa-solid fa-clock text-green-600"></i>
                    {exam.date}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(exam.link, "_blank")}
                className="mt-auto w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded-md font-medium transition-all shadow-sm"
              >
                Xem đề thi
              </motion.button>
            </motion.div>
          ))}
        </div>

        {exams.length === 0 && (
          <p className="text-gray-500 text-center mt-6">
            Hiện chưa có đề thi cho môn học này.
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default ExamSection;
