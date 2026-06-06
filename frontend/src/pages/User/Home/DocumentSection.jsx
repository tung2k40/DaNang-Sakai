import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { getDocumentsAPI, getMyDocumentsAPI } from "../../../api/documentAPI";
import SkeletonCard from "../../../components/ui/SkeletonCard";
import Pagination from "../../../components/ui/Pagination";
import FilePreviewModal from "../../../components/ui/FilePreviewModal";
import { FolderOpen, SearchCode, CloudUpload } from "lucide-react";

function DocumentSection({ subject, searchQuery = "", sortBy = "newest", isMine } = {}) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [previewFile, setPreviewFile] = useState(null);
  const itemsPerPage = 6; // Set to 6 to make grid look super balanced

  const heading = isMine ? "Tài liệu đã tải lên" : (subject || "Tất cả môn học");

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const data = isMine
          ? await getMyDocumentsAPI()
          : await getDocumentsAPI(subject || undefined);
        setDocuments(data);
        setCurrentPage(1);
      } catch {
        toast.error("Không thể tải tài liệu. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [subject]);

  // Client-side search filtering
  const filteredDocuments = documents.filter((doc) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase().trim();
    return (
      doc.title?.toLowerCase().includes(query) ||
      doc.description?.toLowerCase().includes(query) ||
      doc.author?.toLowerCase().includes(query) ||
      doc.subject?.toLowerCase().includes(query)
    );
  });

  // Client-side sorting
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
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
  const totalPages = Math.ceil(sortedDocuments.length / itemsPerPage);
  const currentDocuments = sortedDocuments.slice(
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
            <i className="fa-solid fa-book-open text-blue-500"></i>
            Tài liệu đã tải lên
          </h3>
        ) : (
          <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-6 text-center flex items-center justify-center gap-2 border-b border-slate-100 pb-4">
            <i className="fa-solid fa-book-open text-blue-500"></i>
            Tài liệu học tập
          </h2>
        )}

        {/* Danh sách tài liệu */}
        {sortedDocuments.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {loading
              ? Array.from({ length: itemsPerPage }).map((_, i) => <SkeletonCard key={i} />)
              : currentDocuments.map((doc, index) => (
                  <motion.div
                    key={doc._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    whileHover={{ scale: 1.02, y: -3 }}
                    className="bg-white border border-slate-250/70 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-400/40 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
                  >
                    {/* Nội dung */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-slate-800 font-medium text-[15px] leading-snug mb-2 line-clamp-2 hover:text-blue-600 transition-colors text-left">
                          {doc.title}
                        </h3>
                        <p className="text-[13px] text-slate-500 mb-4 line-clamp-2 text-left leading-relaxed">
                          {doc.description || "Chưa có mô tả chi tiết cho tài liệu này."}
                        </p>
                      </div>

                      <div className="flex gap-3 text-[11px] text-slate-400 flex-wrap justify-start border-t border-slate-100 pt-3">
                        {doc.subject && (
                          <span className="flex items-center gap-1 text-blue-600 font-medium">
                            <i className="fa-solid fa-bookmark text-[10px]"></i>
                            {doc.subject}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <i className="fa-solid fa-user text-slate-350 text-[10px]"></i>
                          {doc.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="fa-solid fa-clock text-slate-350 text-[10px]"></i>
                          {new Date(doc.createdAt).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                    </div>

                    {/* Nút xem trước */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPreviewFile(doc)}
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
        {!loading && sortedDocuments.length === 0 && (
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
                <h3 className="text-lg font-bold text-gray-800 mb-1">Không tìm thấy tài liệu phù hợp</h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  Không tìm thấy tài liệu chứa từ khoá "{searchQuery}". Bạn hãy thử tìm bằng tên môn học hoặc từ khoá khác nhé!
                </p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold text-gray-800 mb-1">Chưa có tài liệu nào</h3>
                <p className="text-sm text-gray-500 max-w-sm mb-5">
                  {isMine
                    ? "Bạn chưa đăng tải tài liệu học tập nào."
                    : `Môn học này hiện chưa có tài liệu học tập nào được chia sẻ.`}
                </p>
                {!isMine && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.__openUploadDocumentModal?.()}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold transition shadow-md flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    <CloudUpload className="w-4 h-4" />
                    Chia sẻ tài liệu ngay
                  </motion.button>
                )}
              </>
            )}
          </div>
        )}

        {/* Phân trang */}
        {!loading && sortedDocuments.length > 0 && (
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
          kind="document"
        />
      )}
    </div>
  );
}

export default DocumentSection;
