import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { getExamsAPI, getMyExamsAPI } from "../../../api/examAPI";
import SkeletonCard from "../../../components/ui/SkeletonCard";
import Pagination from "../../../components/ui/Pagination";

function ExamSection({ subject, isMine } = {}) {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const heading = isMine ? "Đề thi đã tải lên" : (subject || "Tất cả môn học");

  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      try {
        const data = isMine 
          ? await getMyExamsAPI() 
          : await getExamsAPI(subject || undefined);
        setExams(data);
        setCurrentPage(1); // Reset page when subject or data changes
      } catch {
        toast.error("Không thể tải đề thi. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [subject]);

  // Logic phân trang
  const totalPages = Math.ceil(exams.length / itemsPerPage);
  const currentExams = exams.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="relative flex flex-col items-center mt-10">
      {/* Tiêu đề môn học */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute -top-5 text-blue-700 text-4xl font-extrabold px-10 py-1 bg-blue-100 rounded-full border border-blue-300 shadow-md"
      >
        {heading}
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
          {loading
            ? Array.from({ length: itemsPerPage }).map((_, i) => <SkeletonCard key={i} />)
            : currentExams.map((exam, index) => (
                <motion.div
                  key={exam._id}
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

                    <div className="flex justify-center gap-3 text-xs text-gray-500 mb-3 flex-wrap">
                      {exam.subject && (
                        <span className="flex items-center gap-1 text-indigo-600 font-medium">
                          <i className="fa-solid fa-bookmark"></i>
                          {exam.subject}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <i className="fa-solid fa-user text-blue-600"></i>
                        {exam.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="fa-solid fa-clock text-green-600"></i>
                        {new Date(exam.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(exam.fileUrl, "_blank")}
                    className="mt-auto w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded-md font-medium transition-all shadow-sm"
                  >
                    Xem đề thi
                  </motion.button>
                </motion.div>
              ))}
        </div>

        {!loading && exams.length === 0 && (
          <p className="text-gray-500 text-center mt-6">
            {isMine ? "Bạn chưa tải lên đề thi nào." : "Hiện chưa có đề thi cho môn học này."}
          </p>
        )}

        {!loading && exams.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </motion.div>
    </div>
  );
}

export default ExamSection;
