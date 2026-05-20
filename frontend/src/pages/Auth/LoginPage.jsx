import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, GraduationCap, Eye, EyeOff } from "lucide-react";
import loginIllustration from "../../assets/images/login.png";
import backgroundlogin from "../../assets/images/bglogin.jpg";
import { loginAPI } from "../../api/authAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ForgotPasswordModal from "../../components/ForgotPasswordModal";
import { supabase } from "../../utils/supabase";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  const handleSSOLogin = async (provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: window.location.origin + "/auth/callback",
        },
      });
      if (error) {
        toast.error(`Đăng nhập bằng ${provider} thất bại!`);
      }
    } catch (err) {
      toast.error(`Có lỗi xảy ra: ${err.message}`);
    }
  };

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
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${backgroundlogin})`,
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay to ensure background image doesn't clash with content */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

        <div className="relative z-10 flex flex-col md:flex-row w-[90%] max-w-5xl rounded-2xl shadow-2xl overflow-hidden bg-white">
          
          {/* Left Form Section */}
          <div className="md:w-1/2 w-full p-8 md:p-12 flex flex-col justify-center bg-white">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-50 mb-4 ring-8 ring-cyan-50/50">
                <GraduationCap className="w-8 h-8 text-cyan-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Đăng nhập
              </h1>
              <p className="text-gray-500 text-sm">
                Chào mừng bạn đến với hệ thống Danang Scholar
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="nguyenvana@gmail.com"
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Nhập mật khẩu"
                    className="w-full pl-11 pr-11 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-sm text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
                >
                  Quên mật khẩu?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 mt-2"
              >
                Đăng nhập
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500">Hoặc tiếp tục với</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleSSOLogin('google')}
                  className="w-full flex justify-center items-center py-2.5 border border-red-100 rounded-xl shadow-sm bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <i className="fa-brands fa-google text-red-500 text-lg"></i>
                </button>
                <button
                  type="button"
                  onClick={() => handleSSOLogin('github')}
                  className="w-full flex justify-center items-center py-2.5 border border-gray-200 rounded-xl shadow-sm bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <i className="fa-brands fa-github text-gray-800 text-lg"></i>
                </button>
                <button
                  type="button"
                  onClick={() => handleSSOLogin('facebook')}
                  className="w-full flex justify-center items-center py-2.5 border border-blue-100 rounded-xl shadow-sm bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <i className="fa-brands fa-facebook text-blue-600 text-lg"></i>
                </button>
              </div>
            </div>

            <p className="text-center mt-8 text-sm text-gray-600">
              Bạn chưa có tài khoản?{" "}
              <Link
                to="/signup"
                className="text-cyan-600 hover:text-cyan-700 font-semibold transition-colors"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>

          {/* Right Banner Section */}
          <div className="md:w-1/2 w-full hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-cyan-600 to-blue-800 p-12 text-center text-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white blur-3xl"></div>
            </div>

            <img
              src={loginIllustration}
              alt="Education Illustration"
              className="w-full max-w-[280px] mx-auto drop-shadow-2xl mb-8 relative z-10 hover:scale-105 transition-transform duration-500"
            />
            <h2 className="text-3xl font-bold mb-4 relative z-10">
              Danang Scholar
            </h2>
            <p className="text-cyan-100 mb-8 max-w-sm relative z-10">
              Nền tảng học tập trực tuyến thông minh, kết nối tri thức và phát triển tương lai.
            </p>
            <div className="flex justify-center gap-3 flex-wrap relative z-10">
              <span className="px-4 py-1.5 text-xs bg-white/10 backdrop-blur-md text-white font-medium rounded-full border border-white/20 shadow-sm">
                Truy cập mở
              </span>
              <span className="px-4 py-1.5 text-xs bg-white/10 backdrop-blur-md text-white font-medium rounded-full border border-white/20 shadow-sm">
                Học tập linh hoạt
              </span>
              <span className="px-4 py-1.5 text-xs bg-white/10 backdrop-blur-md text-white font-medium rounded-full border border-white/20 shadow-sm">
                Bảo mật cao
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
