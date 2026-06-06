import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { getExamsAPI, getMyExamsAPI } from "../../../api/examAPI";
import SkeletonCard from "../../../components/ui/SkeletonCard";
import Pagination from "../../../components/ui/Pagination";
import FilePreviewModal from "../../../components/ui/FilePreviewModal";
import { FolderOpen, SearchCode, CloudUpload } from "lucide-react";

function ExamSection({ subject, searchQuery = "", sortBy = "newest", isMine } = {}) {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [previewFile, setPreviewFile] = useState(null);
  const itemsPerPage = 6; // Balance grid

  const heading = isMine ? "Đề thi đã tải lên" : (subject || "Tất cả môn học");

  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      try {
        const data = isMine
          ? await getMyExamsAPI()
          : await getExamsAPI(subject || undefined);
        setExams(data);
        setCurrentPage(1);
      } catch {
        toast.error("Không thể tải đề thi. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [subject]);

  // Client-side search filtering
  const filteredExams = exams.filter((exam) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase().trim();
    return (
      exam.title?.toLowerCase().includes(query) ||
      exam.description?.toLowerCase().includes(query) ||
      exam.author?.toLowerCase().includes(query) ||
      exam.subject?.toLowerCase().includes(query)
    );
  });

  // Client-side sorting
  const sortedExams = [...filteredExams].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    if (sortBy === "alphabetical") {
      return (a.title || "").localeCompare(b.title || "", "vi");
    }
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedExams.length / itemsPerPage);
  const currentExams = sortedExams.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={`relative flex flex-col items-center ${isMine ? "mt-0" : "mt-8"}`}>
      {/* Tiêu đề môn học */}
      {!isMine && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute -top-4 text-blue-600 text-sm md:text-base font-semibold px-5 py-1.5 bg-blue-50/95 backdrop-blur-md rounded-full border border-blue-200/80 shadow-sm text-center whitespace-nowrap z-10"
        >
          {heading}
        </motion.div>
      )}

      {/* Khung chính */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className={`w-full ${isMine ? "" : "p-5 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-6xl mt-4 md:mt-8 relative"}`}
      >
        {isMine ? (
          <h3 className="text-[17px] font-semibold text-slate-800 border-b border-slate-100 pb-3 mb-6 flex items-center gap-2">
            <i className="fa-solid fa-file-lines text-blue-500"></i>
            Đề thi đã tải lên
          </h3>
        ) : (
          <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-6 text-center flex items-center justify-center gap-2 border-b border-slate-100 pb-4">
            <i className="fa-solid fa-file-lines text-blue-500"></i>
            Đề thi học tập
          </h2>
        )}

        {/* Danh sách đề thi */}
        {sortedExams.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {loading
              ? Array.from({ length: itemsPerPage }).map((_, i) => <SkeletonCard key={i} />)
              : currentExams.map((exam, index) => (
                  <motion.div
                    key={exam._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    whileHover={{ scale: 1.02, y: -3 }}
                    className="bg-white border border-slate-250/70 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-400/40 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
                  >
                    {/* Nội dung đề thi */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-slate-800 font-medium text-[15px] leading-snug mb-2 line-clamp-2 hover:text-blue-600 transition-colors text-left">
                          {exam.title}
                        </h3>
                        <p className="text-[13px] text-slate-500 mb-4 line-clamp-2 text-left leading-relaxed">
                          {exam.description || "Chưa có mô tả chi tiết cho đề thi này."}
                        </p>
                      </div>

                      <div className="flex gap-3 text-[11px] text-slate-400 flex-wrap justify-start border-t border-slate-100 pt-3">
                        {exam.subject && (
                          <span className="flex items-center gap-1 text-blue-600 font-medium">
                            <i className="fa-solid fa-bookmark text-[10px]"></i>
                            {exam.subject}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <i className="fa-solid fa-user text-slate-350 text-[10px]"></i>
                          {exam.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="fa-solid fa-clock text-slate-350 text-[10px]"></i>
                          {new Date(exam.createdAt).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                    </div>

                    {/* Nút xem trước */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPreviewFile(exam)}
                      className="mt-4 w-full bg-blue-50/80 hover:bg-blue-600 text-blue-600 hover:text-white text-xs py-2.5 rounded-xl font-medium transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <i className="fa-solid fa-eye"></i>
                      Xem trước
                    </motion.button>
                  </motion.div>
                ))}
          </div>
        )}

        {/* Empty States */}
        {!loading && sortedExams.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-blue-500">
              {searchQuery ? (
                <SearchCode className="w-8 h-8 text-blue-500 animate-pulse" />
              ) : (
                <FolderOpen className="w-8 h-8 text-blue-500" />
              )}
            </div>
            {searchQuery ? (
              <>
                <h3 className="text-lg font-bold text-gray-800 mb-1">Không tìm thấy đề thi phù hợp</h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  Không tìm thấy đề thi nào chứa từ khoá "{searchQuery}". Bạn hãy thử tìm bằng tên môn học khác xem sao!
                </p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold text-gray-800 mb-1">Chưa có đề thi nào</h3>
                <p className="text-sm text-gray-500 max-w-sm mb-5">
                  {isMine
                    ? "Bạn chưa đăng tải đề thi nào."
                    : `Môn học này hiện chưa có đề thi nào được chia sẻ.`}
                </p>
                {!isMine && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.__openUploadExamModal?.()}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold transition shadow-md flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    <CloudUpload className="w-4 h-4" />
                    Chia sẻ đề thi ngay
                  </motion.button>
                )}
              </>
            )}
          </div>
        )}

        {/* Phân trang */}
        {!loading && sortedExams.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </motion.div>

      {/* Preview Modal */}
      {previewFile && (
        <FilePreviewModal
          file={previewFile}
          onClose={() => setPreviewFile(null)}
          kind="exam"
        />
      )}
    </div>
  );
}

export default ExamSection;
