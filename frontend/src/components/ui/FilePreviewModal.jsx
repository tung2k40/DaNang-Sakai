import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, FileText, Calendar, User, BookOpen, Loader2, AlertCircle, RefreshCw } from "lucide-react";

/**
 * FilePreviewModal
 * @param {object}   file      - { title, description, fileUrl, subject, author, createdAt, type }
 * @param {function} onClose   - callback đóng modal
 * @param {string}   kind      - "document" | "exam"
 */
export default function FilePreviewModal({ file, onClose, kind = "document" }) {
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  // Đóng bằng Escape
  const handleKeyDown = useCallback(
    (e) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  // Reset loading state khi file thay đổi
  useEffect(() => {
    setIframeLoading(true);
    setIframeError(false);
  }, [file?.fileUrl, retryKey]);

  if (!file) return null;

  const isImage = /\.(png|jpe?g|gif|webp|svg)$/i.test(file.fileUrl || "");

  // Dùng Google Docs Viewer cho mọi loại file (PDF + Office docs)
  // để tránh Content-Disposition: attachment từ server
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(file.fileUrl)}&embedded=true`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col overflow-hidden"
          style={{ maxHeight: "92vh" }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-gray-100 bg-gray-50 flex-shrink-0">
            <div className="min-w-0 flex-1">
              <h2 className="text-base md:text-lg font-bold text-gray-800 line-clamp-2 leading-snug">
                {file.title}
              </h2>
              {file.description && (
                <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{file.description}</p>
              )}

              {/* Meta info */}
              <div className="flex flex-wrap gap-3 mt-2">
                {file.subject && (
                  <span className="flex items-center gap-1 text-xs text-indigo-600 font-medium">
                    <BookOpen className="w-3 h-3" />
                    {file.subject}
                  </span>
                )}
                {file.author && (
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <User className="w-3 h-3" />
                    {file.author}
                  </span>
                )}
                {file.createdAt && (
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {new Date(file.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={file.fileUrl}
                target="_blank"
                rel="noreferrer"
                title="Mở trong tab mới"
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href={file.fileUrl}
                download
                title="Tải xuống"
                className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Tải xuống</span>
              </a>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Preview area */}
          <div className="flex-1 overflow-hidden bg-gray-100 min-h-0 relative" style={{ minHeight: "60vh" }}>

            {/* Hiển thị ảnh trực tiếp */}
            {isImage ? (
              <div className="flex items-center justify-center h-full p-6">
                <img
                  src={file.fileUrl}
                  alt={file.title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow"
                />
              </div>
            ) : (
              <>
                {/* Loading spinner */}
                {iframeLoading && !iframeError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10 gap-3">
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                    <p className="text-sm text-gray-500 font-medium">Đang tải tài liệu...</p>
                    <p className="text-xs text-gray-400">Vui lòng chờ trong giây lát</p>
                  </div>
                )}

                {/* Error state */}
                {iframeError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10 gap-4">
                    <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center">
                      <AlertCircle className="w-8 h-8 text-orange-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-gray-700 font-semibold mb-1">Không thể hiển thị xem trước</p>
                      <p className="text-sm text-gray-400 max-w-xs">
                        File này không hỗ trợ xem trực tiếp. Bạn có thể tải xuống để xem.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => { setIframeError(false); setRetryKey(k => k + 1); }}
                        className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Thử lại
                      </button>
                      <a
                        href={file.fileUrl}
                        download
                        className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Tải xuống
                      </a>
                    </div>
                  </div>
                )}

                {/* Google Docs Viewer iframe */}
                <iframe
                  key={retryKey}
                  src={googleViewerUrl}
                  className="w-full h-full border-0"
                  style={{ minHeight: "60vh", display: iframeError ? "none" : "block" }}
                  title={file.title}
                  onLoad={() => setIframeLoading(false)}
                  onError={() => { setIframeLoading(false); setIframeError(true); }}
                />
              </>
            )}
          </div>

          {/* Footer hint */}
          <div className="px-5 py-2.5 border-t border-gray-100 bg-gray-50 flex items-center justify-between flex-shrink-0">
            <p className="text-xs text-gray-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Nhấn <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600 text-[10px] font-mono mx-1">Esc</kbd> để đóng
            </p>
            <p className="text-xs text-gray-400">
              {kind === "exam" ? "Đề thi" : "Tài liệu học tập"} · Google Docs Viewer
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
