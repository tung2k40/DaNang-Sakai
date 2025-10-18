import { motion } from "framer-motion";

function DocumentSection({ subject }) {
  const documents = [
    {
      id: 1,
      title: "Chuyên đề Hàm số và đồ thị lớp 12",
      type: "PDF",
      author: "Thầy Phạm Minh Hùng",
      date: "15/10/2025",
      description:
        "Tổng hợp công thức, tính đơn điệu, cực trị và tiệm cận của hàm số. Có ví dụ minh họa chi tiết.",
      link: "#",
    },
    {
      id: 2,
      title: "Bài giảng Tích phân và ứng dụng",
      type: "Slide",
      author: "Cô Nguyễn Thị Hạnh",
      date: "14/10/2025",
      description:
        "Bài giảng trực quan về tích phân, cách tính diện tích hình phẳng và thể tích khối tròn xoay.",
      link: "#",
    },
    {
      id: 3,
      title: "Video hướng dẫn Hình học không gian Oxyz",
      type: "Video",
      author: "Thầy Lê Văn Phúc",
      date: "10/10/2025",
      description:
        "Giải thích các dạng bài về khoảng cách, góc và phương trình mặt phẳng trong không gian.",
      link: "#",
    },
    {
      id: 4,
      title: "Lý thuyết và bài tập Tổ hợp - Xác suất",
      type: "PDF",
      author: "Thầy Đỗ Minh Quân",
      date: "08/10/2025",
      description:
        "Tổng hợp công thức, dạng bài phổ biến và mẹo giải nhanh phần tổ hợp - xác suất.",
      link: "#",
    },
    {
      id: 5,
      title: "Slide Hướng dẫn Giải phương trình lượng giác",
      type: "Slide",
      author: "Cô Trần Mỹ Duyên",
      date: "06/10/2025",
      description:
        "Slide trình bày phương pháp giải phương trình lượng giác và bài tập luyện tập cơ bản.",
      link: "#",
    },
    {
      id: 6,
      title: "Video Bất đẳng thức và cực trị",
      type: "Video",
      author: "Thầy Nguyễn Hoàng Nam",
      date: "05/10/2025",
      description:
        "Giải thích các bất đẳng thức quan trọng và bài tập minh họa dễ hiểu, sinh động.",
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
          <i className="fa-solid fa-book-open text-blue-500 text-3xl"></i>
          Tài liệu học tập
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-blue-200 transition-all duration-300 flex flex-col justify-between h-[270px]"
            >
              {/* Badge */}
              <span
                className={`absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1 rounded-full border text-[13px] font-semibold shadow-sm ${
                  doc.type === "PDF"
                    ? "bg-red-50 border-red-300 text-red-600"
                    : doc.type === "Slide"
                    ? "bg-orange-50 border-orange-300 text-orange-600"
                    : "bg-emerald-50 border-emerald-300 text-emerald-600"
                }`}
              >
                <i
                  className={`fa-solid ${
                    doc.type === "PDF"
                      ? "fa-file-pdf"
                      : doc.type === "Slide"
                      ? "fa-file-powerpoint"
                      : "fa-video"
                  }`}
                ></i>
                {doc.type}
              </span>

              {/* Nội dung */}
              <div className="text-center mt-3">
                <h3 className="text-blue-700 font-semibold text-base mb-2 line-clamp-2">
                  {doc.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 text-center line-clamp-2">
                  {doc.description}
                </p>

                <div className="flex justify-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <i className="fa-solid fa-user text-blue-600"></i>
                    {doc.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="fa-solid fa-clock text-green-600"></i>
                    {doc.date}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(doc.link, "_blank")}
                className="mt-auto w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded-md font-medium transition-all shadow-sm"
              >
                Xem tài liệu
              </motion.button>
            </motion.div>
          ))}
        </div>

        {documents.length === 0 && (
          <p className="text-gray-500 text-center mt-6">
            Hiện chưa có tài liệu cho môn học này.
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default DocumentSection;
