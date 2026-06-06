import { useState } from "react";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import DocumentSection from "./DocumentSection";
import ExamSection from "./ExamSection";
import { useAuth } from "../../../contexts/AuthContext";
import AboutPage from "../../../pages/AboutPage";
import { Search, SlidersHorizontal, BookOpen, FileText } from "lucide-react";

function Home({ selectedOption }) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  if (user?.role === 'admin') {
    return <Navigate to="/admin/documents" replace />;
  }

  if (!user) {
    return <AboutPage />;
  }

  const showDocuments = !selectedOption || selectedOption.type === "tailieu";
  const showExams = !selectedOption || selectedOption.type === "dethi";
  const activeSubject = selectedOption?.subject || null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white py-8 md:py-12 px-4 md:px-6 overflow-hidden">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-4 md:mt-6 mb-8 md:mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-4xl font-bold text-slate-800 tracking-tight mb-3"
        >
          Chào mừng đến với{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">DaNang Scholar</span> 🎓
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
        >
          Nền tảng học tập trực tuyến giúp học sinh{" "}
          <span className="text-blue-600 font-medium">
            tra cứu tài liệu, luyện đề, ôn tập và chia sẻ kiến thức
          </span>{" "}
          dễ dàng. Hệ thống phân loại khoa học và cập nhật liên tục để hỗ trợ bạn học hiệu quả nhất.
        </motion.p>
      </div>

      {/* Unified Search & Sort Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-6xl mx-auto w-full mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-200/80 flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu, đề thi, tác giả..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition-all text-gray-800 placeholder-gray-400"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            Sắp xếp:
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition-all cursor-pointer font-medium"
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="alphabetical">Tiêu đề A-Z</option>
          </select>
        </div>
      </motion.div>

      {/* Sections rendering */}
      <div className="max-w-6xl mx-auto w-full space-y-12 mb-12 md:mb-16">
        {showDocuments && (
          <DocumentSection
            subject={activeSubject}
            searchQuery={searchQuery}
            sortBy={sortBy}
          />
        )}
        {showExams && (
          <ExamSection
            subject={activeSubject}
            searchQuery={searchQuery}
            sortBy={sortBy}
          />
        )}
      </div>

      {/* Feature Cards - Show only on main view */}
      {!selectedOption && (
        <>
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
            {[
              {
                icon: <BookOpen className="w-8 h-8 text-blue-600" />,
                title: "Tài liệu học tập",
                desc: "Tổng hợp bài giảng, PDF, slide và tài nguyên ôn luyện theo từng môn học.",
                color: "bg-blue-50/50 border-blue-100",
              },
              {
                icon: <FileText className="w-8 h-8 text-emerald-600" />,
                title: "Đề thi & Kiểm tra",
                desc: "Kho đề thi, đề cương và bài trắc nghiệm giúp bạn rèn luyện hiệu quả.",
                color: "bg-emerald-50/50 border-emerald-100",
              },
              {
                icon: <i className="fa-solid fa-users text-amber-500 text-3xl"></i>,
                title: "Cộng đồng học tập",
                desc: "Kết nối bạn bè, thảo luận môn học và chia sẻ kinh nghiệm học tập.",
                color: "bg-amber-50/50 border-amber-100",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className={`p-6 rounded-2xl border ${feature.color} shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 text-center flex flex-col items-center justify-center`}
              >
                <div className="mb-3">{feature.icon}</div>
                <h3 className="font-medium text-[17px] text-slate-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Info Section */}
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl font-semibold text-slate-800 mb-4"
            >
              🌟 Cùng nhau xây dựng cộng đồng học tập số tại Đà Nẵng
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            >
              Hãy bắt đầu hành trình tri thức của bạn hôm nay. Tìm tài liệu, làm bài
              thi, kết nối bạn bè và lan tỏa tinh thần học tập suốt đời. Cùng nhau,
              chúng ta sẽ biến việc học trở thành niềm vui!
            </motion.p>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
