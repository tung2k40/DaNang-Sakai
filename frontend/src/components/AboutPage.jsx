import { motion } from "framer-motion";
import tung from "../assets/images/avttung.png";
import giang from "../assets/images/avtgiang.png";

export default function AboutPage() {


  const values = [
    {
      icon: "fa-solid fa-lightbulb",
      isImage: false,
      title: "Tri thức mở",
      desc: "Tạo cơ hội để mọi người học tập, chia sẻ và phát triển tri thức không giới hạn.",
      color: "text-yellow-500",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      isImage: true,
      title: "Kết nối cộng đồng",
      desc: "Lan tỏa tinh thần học tập, hợp tác và hỗ trợ giữa học sinh, sinh viên và giáo viên.",
      color: "text-blue-600",
    },
    {
      icon: "fa-solid fa-graduation-cap",
      isImage: false,
      title: "Phát triển bền vững",
      desc: "Xây dựng môi trường học tập hiện đại, giúp người học trưởng thành toàn diện.",
      color: "text-emerald-600",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/527/527995.png",
      isImage: true,
      title: "Sáng tạo không ngừng",
      desc: "Khuyến khích học sinh đổi mới tư duy, khám phá và sáng tạo trong học tập.",
      color: "text-purple-600",
    },
    {
      icon: "fa-solid fa-globe",
      isImage: false,
      title: "Hội nhập toàn cầu",
      desc: "Tạo điều kiện để học sinh dễ dàng tiếp cận kiến thức quốc tế và phát triển kỹ năng 4.0.",
      color: "text-indigo-600",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828961.png",
      isImage: true,
      title: "Chia sẻ tri thức",
      desc: "Xây dựng cộng đồng học tập cùng phát triển, cùng thành công.",
      color: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-6">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4"
        >
          Về <span className="text-blue-500">DaNang Scholar</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-gray-600 max-w-3xl mx-auto text-lg"
        >
          Nền tảng học tập và chia sẻ tri thức dành cho học sinh, sinh viên và
          giáo viên tại Đà Nẵng — nơi khơi dậy đam mê học hỏi, sáng tạo và kết
          nối tri thức không giới hạn 🌱
        </motion.p>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center mb-20">
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/8512/8512593.png"
          alt="Học tập"
          className="w-80 mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-blue-700 mb-3">
            🎯 Sứ mệnh của chúng tôi
          </h2>
          <p className="text-gray-700 leading-relaxed">
            DaNang Scholar mong muốn xây dựng một hệ sinh thái học tập trực
            tuyến thân thiện, nơi mọi học sinh đều có thể:
          </p>
          <ul className="list-disc pl-5 mt-3 text-gray-700 space-y-1">
            <li>Truy cập tài liệu, bài giảng, đề thi dễ dàng.</li>
            <li>
              Kết nối và chia sẻ kiến thức với cộng đồng học sinh, giáo viên.
            </li>
            <li>Phát triển tư duy, sáng tạo và tinh thần học tập suốt đời.</li>
          </ul>
        </motion.div>
      </div>

      {/* Value Cards */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-center text-2xl font-bold text-blue-700 mb-10">
          🌟 Giá trị cốt lõi
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition transform"
            >
              {item.isImage ? (
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-16 h-16 mx-auto mb-3 object-contain"
                />
              ) : (
                <i className={`${item.icon} ${item.color} text-5xl mb-3`}></i>
              )}
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      {/* Team Section */}
      <div className="max-w-6xl mx-auto text-center mt-20">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          💼 Đội ngũ phát triển
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed">
          DaNang Scholar được phát triển bởi nhóm sinh viên đam mê công nghệ,
          sáng tạo và giáo dục  cùng hướng đến việc xây dựng nền tảng học tập
          hiện đại, thân thiện và dễ tiếp cận cho học sinh Việt Nam.
        </p>

        <div className="flex flex-wrap justify-center gap-10">
          {[
            {
              name: "Hoàng Thanh Tùng",
              role: "Frontend Developer",
              color: "from-blue-500 to-indigo-500",
              avatar: tung,
            },
            {
              name: "Đinh Vĩnh Giang",
              role: "Backend Developer",
              color: "from-green-500 to-emerald-500",
              avatar: giang,
            },
          ].map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative group w-60 bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300 overflow-hidden"
            >
              {/* Ảnh đại diện */}
              <div className="relative w-28 h-28 mx-auto mt-6">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-20 blur-md transition`}
                />
              </div>

              {/* Tên và vai trò */}
              <div className="mt-5 pb-6">
                <h4 className="font-semibold text-lg text-gray-800 group-hover:text-blue-700 transition">
                  {member.name}
                </h4>
                <p className="text-sm text-gray-500 font-medium">
                  {member.role}
                </p>
              </div>

              {/* Thanh hiệu ứng gradient dưới */}
              <div
                className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${member.color} opacity-0 group-hover:opacity-100 transition`}
              ></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
