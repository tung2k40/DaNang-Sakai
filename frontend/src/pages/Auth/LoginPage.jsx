import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, GraduationCap } from "lucide-react";
import loginIllustration from "../../assets/images/login.png";
import backgroundlogin from "../../assets/images/bglogin.jpg";
import { loginAPI } from "../../api/authAPI";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ForgotPasswordModal from "../../components/ForgotPasswordModal";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showForgotModal, setShowForgotModal] = useState(false);
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    if (!formData.email || !formData.password) {
      return toast.error("Email và mật khẩu không được để trống!");
    }

    try {
      await loginAPI(formData);

      await fetchUser();
      toast.success("Đăng nhập thành công!");

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (err) {
      let msg =
        err?.response?.data?.message || err.message || "Đăng nhập thất bại!";

      toast.error(msg);
    }
  };

  return (
    <>
      {" "}
      <Toaster position="top-center" />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundlogin})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="flex flex-col md:flex-row w-[90%] md:w-[65%] lg:w-[55%] rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="md:w-1/2 w-full p-10 flex flex-col justify-center">
            <div className="text-center mb-8">
              <GraduationCap className="w-10 h-10 text-cyan-600 mx-auto mb-3" />
              <h1 className="text-3xl font-extrabold text-gray-800">
                Chào mừng bạn trở lại!
              </h1>
              <p className="text-gray-500 mt-1">
                Đăng nhập để tiếp tục hành trình học tập của bạn
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa chỉ Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Nguyenvana@gmail.com"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Nhập mật khẩu của bạn"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-cyan-400/50 hover:shadow-cyan-400/80 mt-6"
              >
                Đăng nhập
              </button>
              <div className="text-right mt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-sm text-cyan-600 hover:text-cyan-800 font-medium transition-colors"
                >
                  Quên mật khẩu?
                </button>
              </div>
            </form>

            <p className="text-center mt-5 text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <Link
                to="/signup"
                className="text-cyan-600 hover:text-cyan-700 font-semibold"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>

          <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-blue-50/70 p-10 text-center">
            <img
              src={loginIllustration}
              alt="Education Illustration"
              className="w-full max-w-xs mx-auto drop-shadow-xl"
            />
            <h3 className="mt-6 text-2xl font-bold text-cyan-700">
              Học hỏi. Phát triển. Kết nối.
            </h3>
            <p className="text-gray-600 mt-2 mb-4 text-sm">
              Nâng cao việc học với mạng lưới học thuật của chúng tôi.
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <span className="px-3 py-1 text-xs bg-cyan-200/80 text-cyan-800 font-medium rounded-full">
                Truy cập miễn phí
              </span>
              <span className="px-3 py-1 text-xs bg-cyan-200/80 text-cyan-800 font-medium rounded-full">
                Học tập hiện đại
              </span>
              <span className="px-3 py-1 text-xs bg-cyan-200/80 text-cyan-800 font-medium rounded-full">
                Nền tảng bảo mật
              </span>
            </div>
          </div>
        </div>
      </div>
      {showForgotModal && (
        <ForgotPasswordModal onClose={() => setShowForgotModal(false)} />
      )}
    </>
  );
}
