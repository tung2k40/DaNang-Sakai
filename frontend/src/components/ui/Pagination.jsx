import { motion } from "framer-motion";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + 2);

  // Điều chỉnh lại nếu ở các trang cuối để luôn hiển thị 3 số (nếu có đủ)
  if (endPage - startPage < 2) {
    startPage = Math.max(1, endPage - 2);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
      >
        <i className="fa-solid fa-chevron-left mr-1"></i> Trước
      </motion.button>

      {/* Hiển thị ... nếu có trang bị ẩn ở đầu */}
      {startPage > 1 && (
        <span className="px-2 font-bold text-gray-400 tracking-widest">...</span>
      )}

      {/* Danh sách các số trang (tối đa 3 số) */}
      {pages.map((page) => (
        <motion.button
          key={page}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg font-semibold flex items-center justify-center transition-colors ${
            currentPage === page
              ? "bg-blue-600 text-white shadow-md border border-blue-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
          }`}
        >
          {page}
        </motion.button>
      ))}

      {/* Hiển thị ... nếu có trang bị ẩn ở cuối */}
      {endPage < totalPages && (
        <span className="px-2 font-bold text-gray-400 tracking-widest">...</span>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
      >
        Sau <i className="fa-solid fa-chevron-right ml-1"></i>
      </motion.button>
    </div>
  );
}

export default Pagination;
