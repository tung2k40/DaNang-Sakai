import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { getDocumentsAPI } from "../../api/documentAPI";
import SkeletonCard from "../../components/ui/SkeletonCard";

function DocumentSection({ subject } = {}) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const heading = subject || "Tất cả môn học";

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const data = await getDocumentsAPI(subject || undefined);
        setDocuments(data);
      } catch {
        toast.error("Không thể tải tài liệu. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [subject]);

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
          <i className="fa-solid fa-book-open text-blue-500 text-3xl"></i>
          Tài liệu học tập
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : documents.map((doc, index) => (
                <motion.div
                  key={doc._id}
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
                        : doc.type === "Word"
                        ? "bg-indigo-50 border-indigo-300 text-indigo-600"
                        : doc.type === "Excel"
                        ? "bg-green-50 border-green-300 text-green-600"
                        : doc.type === "PowerPoint"
                        ? "bg-orange-50 border-orange-300 text-orange-600"
                        : "bg-emerald-50 border-emerald-300 text-emerald-600"
                    }`}
                  >
                    <i
                      className={`fa-solid ${
                        doc.type === "PDF"
                          ? "fa-file-pdf"
                          : doc.type === "Word"
                          ? "fa-file-word"
                          : doc.type === "Excel"
                          ? "fa-file-excel"
                          : doc.type === "PowerPoint"
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

                    <div className="flex justify-center gap-3 text-xs text-gray-500 mb-3 flex-wrap">
                      {doc.subject && (
                        <span className="flex items-center gap-1 text-indigo-600 font-medium">
                          <i className="fa-solid fa-bookmark"></i>
                          {doc.subject}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <i className="fa-solid fa-user text-blue-600"></i>
                        {doc.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="fa-solid fa-clock text-green-600"></i>
                        {new Date(doc.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(doc.fileUrl, "_blank")}
                    className="mt-auto w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded-md font-medium transition-all shadow-sm"
                  >
                    Xem tài liệu
                  </motion.button>
                </motion.div>
              ))}
        </div>

        {!loading && documents.length === 0 && (
          <p className="text-gray-500 text-center mt-6">
            Hiện chưa có tài liệu cho môn học này.
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default DocumentSection;
