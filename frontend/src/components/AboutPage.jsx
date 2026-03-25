import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import tung from "../assets/images/avttung.png";
import giang from "../assets/images/avtgiang.png";

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const values = [
    {
      icon: "fa-solid fa-lightbulb",
      isImage: false,
      title: "Tri thức mở",
      desc: "Tạo cơ hội để mọi người học tập, chia sẻ và phát triển tri thức không giới hạn.",
      color: "text-amber-500",
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
      color: "text-emerald-500",
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
      color: "text-indigo-500",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828961.png",
      isImage: true,
      title: "Chia sẻ tri thức",
      desc: "Xây dựng cộng đồng học tập cùng phát triển, cùng thành công.",
      color: "text-rose-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Dynamic Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[90vh]">
        {/* Abstract Background Shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-indigo-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] bg-purple-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block py-1.5 px-4 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-blue-700 text-sm font-semibold tracking-wide mb-8 shadow-sm"
            >
              ✨ NỀN TẢNG HỌC TẬP THẾ HỆ MỚI
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
              Khơi Dậy Đam Mê <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Kết Nối Tri Thức
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              DaNang Scholar là Nền tảng học tập và chia sẻ tri thức dành cho học sinh, sinh viên và giáo viên — nơi học hỏi không giới hạn 🌱
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-center"
              >
                Bắt Đầu Học Tập Ngay
              </Link>
              <a
                href="#mission"
                className="px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 rounded-full font-semibold text-lg border border-slate-200 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all duration-300 w-full sm:w-auto text-center"
              >
                Tìm Hiểu Thêm
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modern Mission Section */}
      <section id="mission" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-3xl transform -rotate-3 scale-105 -z-10 transition-transform duration-500 hover:rotate-0"></div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                alt="Students collaborating"
                className="rounded-3xl shadow-2xl object-cover h-[500px] w-full"
              />
              {/* Floating element */}
              <motion.div 
                style={{ y }}
                className="absolute -bottom-10 -right-4 md:-right-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl w-64 border border-white/50"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-green-100/80 rounded-full flex items-center justify-center text-green-600 text-xl shadow-inner">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Hiệu Quả</h4>
                    <p className="text-sm text-slate-500">Học tập thông minh</p>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-green-500 h-full rounded-full"
                  ></motion.div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Xây dựng hệ sinh thái <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">học tập trực tuyến</span> toàn diện
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                DaNang Scholar mang đến trải nghiệm học tập hiện đại, giúp bạn dễ dàng truy cập tài nguyên, kết nối bạn bè và phát triển bản thân mỗi ngày.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: "fa-book-open", title: "Kho tài liệu khổng lồ", desc: "Truy cập hàng ngàn bài giảng, đề thi và tài liệu học tập chuẩn hóa." },
                  { icon: "fa-users", title: "Cộng đồng năng động", desc: "Kết nối và thảo luận cùng hàng ngàn học sinh, sinh viên và giáo viên." },
                  { icon: "fa-rocket", title: "Phát triển tư duy", desc: "Khơi dậy niềm đam mê khám phá và sáng tạo trong học tập." }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="flex gap-5 group"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <i className={`fa-solid ${item.icon}`}></i>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-800 mb-1">{item.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Background decorative patterns */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply opacity-50 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Cốt Lõi Của Chúng Tôi</span>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Giá Trị Cốt Lõi</h2>
            <p className="text-lg text-slate-600">Những nguyên tắc định hình nền tảng và cách chúng tôi phục vụ cộng đồng học tập tại Đà Nẵng và trên toàn quốc.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-[2rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-slate-50 border border-slate-100 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm">
                  {item.isImage ? (
                    <img src={item.icon} alt={item.title} className="w-8 h-8 object-contain" />
                  ) : (
                    <i className={`${item.icon} ${item.color} text-3xl drop-shadow-sm`}></i>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium opacity-90">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Những Người Đứng Sau</span>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Đội Ngũ Phát Triển</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Nhóm sinh viên đam mê công nghệ đứng sau nền tảng DaNang Scholar, với khát vọng số hóa giáo dục và kết nối tri thức.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-12 lg:gap-20">
            {[
              {
                name: "Hoàng Thanh Tùng",
                role: "Frontend Developer & UI/UX Design",
                color: "from-blue-500 to-indigo-600",
                avatar: tung,
              },
              {
                name: "Đinh Vĩnh Giang",
                role: "Backend Architecture & Database",
                color: "from-emerald-400 to-teal-500",
                avatar: giang,
              },
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="w-full max-w-[320px]"
              >
                <div className="relative group rounded-[2.5rem] bg-slate-50 pt-16 pb-10 px-8 border border-white shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col items-center hover:-translate-y-2">
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-[0.03] rounded-[2.5rem] transition-opacity duration-500`}></div>
                  
                  <div className="absolute -top-16 relative w-40 h-40 mb-6 group-hover:-translate-y-4 transition-transform duration-500">
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.color} rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 scale-90`}></div>
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="relative w-full h-full rounded-full object-cover border-[6px] border-white shadow-xl z-10 bg-white"
                    />
                  </div>
                  
                  <h4 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all text-center">
                    {member.name}
                  </h4>
                  <p className="text-slate-500 font-medium text-center text-sm uppercase tracking-wide">
                    {member.role}
                  </p>
                  
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-indigo-600/20 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Sẵn sàng bắt đầu hành trình <br/> học tập của bạn?
          </h2>
          <Link
            to="/signup"
            className="inline-block px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-blue-50 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300"
          >
            Đăng Ký Miễn Phí Ngay
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
