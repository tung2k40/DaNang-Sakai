import { motion } from "framer-motion";
import DocumentSection from "./DocumentSection";
import ExamSection from "./ExamSection";
import { useAuth } from "../../contexts/AuthContext";
import AboutPage from "../../components/AboutPage";

function Home({ selectedOption }) {
  const { user } = useAuth();

  if (!user) {
    return <AboutPage />;
  }

  // Nếu đã chọn loại nội dung (tài liệu hoặc đề thi)
  if (selectedOption?.type === "tailieu") {
    return <DocumentSection subject={selectedOption.subject} />;
  }
  if (selectedOption?.type === "dethi") {
    return <ExamSection subject={selectedOption.subject} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-6">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-8 mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4"
        >
          Chào mừng đến với{" "}
          <span className="text-blue-500">DaNang Scholar</span> 🎓
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-gray-700 max-w-3xl mx-auto text-lg"
        >
          <b>DaNang Scholar</b> là nền tảng học tập trực tuyến giúp học sinh{" "}
          <span className="text-blue-600 font-medium">
            tra cứu tài liệu, luyện đề, ôn tập và chia sẻ kiến thức
          </span>{" "}
          một cách dễ dàng. Hệ thống phân loại rõ ràng theo khối học và cập nhật
          liên tục để hỗ trợ bạn học hiệu quả nhất!
        </motion.p>
      </div>

      {/* Dữ liệu từ API (MongoDB) */}
      <div className="max-w-6xl mx-auto w-full space-y-4 mb-16">
        <DocumentSection />
        <ExamSection />
      </div>

      {/* Feature Cards */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {[
          {
            icon: "fa-solid fa-book-open",
            title: "Tài liệu học tập",
            desc: "Tổng hợp bài giảng, PDF, slide và tài nguyên ôn luyện theo từng môn học.",
            color: "text-blue-600",
          },
          {
            icon: "fa-solid fa-file-pen",
            title: "Đề thi & Kiểm tra",
            desc: "Kho đề thi, đề cương và bài trắc nghiệm giúp bạn rèn luyện hiệu quả.",
            color: "text-green-600",
          },
          {
            icon: "fa-solid fa-users",
            title: "Cộng đồng học tập",
            desc: "Kết nối bạn bè, thảo luận môn học và chia sẻ kinh nghiệm học tập.",
            color: "text-amber-500",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition transform text-center"
          >
            <i className={`${feature.icon} ${feature.color} text-4xl mb-3`}></i>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Info Section */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-2xl font-bold text-blue-700 mb-4"
        >
          🌟 Cùng nhau xây dựng cộng đồng học tập số tại Đà Nẵng
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-gray-700 max-w-2xl mx-auto"
        >
          Hãy bắt đầu hành trình tri thức của bạn hôm nay. Tìm tài liệu, làm bài
          thi, kết nối bạn bè và lan tỏa tinh thần học tập suốt đời. Cùng nhau,
          chúng ta sẽ biến việc học trở thành niềm vui!
        </motion.p>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <a
          href="/signup"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-medium shadow-md hover:bg-blue-700 hover:scale-105 transition"
        >
          🚀 Bắt đầu học tập ngay
        </a>
      </motion.div>
    </div>
  );
}

export default Home;
