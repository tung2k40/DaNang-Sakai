import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Home, ArrowLeft, BookOpen, Search } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Floating background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 left-16 w-24 h-24 rounded-2xl bg-blue-100/60 blur-sm"
        />
        <motion.div
          animate={{ y: [0, 18, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-32 right-24 w-16 h-16 rounded-full bg-cyan-100/70"
        />
        <motion.div
          animate={{ y: [0, -14, 0], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-32 left-32 w-20 h-20 rounded-xl bg-indigo-100/50 blur-sm"
        />
        <motion.div
          animate={{ y: [0, 22, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-24 right-32 w-28 h-28 rounded-2xl bg-blue-50/80"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-1/2 left-8 w-12 h-12 rounded-full bg-cyan-200/50"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-1/3 right-8 w-10 h-10 rounded-full bg-blue-200/50"
        />

        {/* Large decorative blobs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-blue-100/40 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-tl from-cyan-100/40 to-transparent blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-lg w-full">
        
        {/* Logo / Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-xl shadow-blue-200 mb-6"
        >
          <GraduationCap className="w-10 h-10 text-white" />
        </motion.div>

        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-2"
        >
          <span className="text-[120px] md:text-[160px] font-black leading-none bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent select-none drop-shadow-sm">
            404
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-3"
        >
          Trang không tồn tại
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-gray-500 text-base md:text-lg mb-10 leading-relaxed"
        >
          Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên, hoặc tạm thời không
          khả dụng.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-blue-200 bg-white text-blue-600 font-semibold hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/home")}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 shadow-md shadow-blue-200"
          >
            <Home className="w-4 h-4" />
            Về trang chủ
          </motion.button>
        </motion.div>

        {/* Suggestion links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-gray-100"
        >
          <p className="text-sm text-gray-400 mb-4">Bạn có thể thử:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/home")}
              className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-full bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Xem tài liệu
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/profile")}
              className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-full bg-cyan-50 text-cyan-600 font-medium hover:bg-cyan-100 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              Hồ sơ của tôi
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
