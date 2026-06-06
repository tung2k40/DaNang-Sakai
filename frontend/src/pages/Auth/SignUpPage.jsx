import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import signupIllustration from "../../assets/images/signup.png";

import OTPModal from "../../components/OTPModal";
import toast from "react-hot-toast";
import { registerAPI, verifyOTP, resendOTP } from "../../api/authAPI";
import { supabase } from "../../lib/supabase";

export default function SignUpPage() {
  const [showOTPModal, setShowOTPModal] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

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

    if (!formData.fullName) {
      return toast.error("Họ và tên không được để trống!");
    }

    if (!formData.email) {
      return toast.error("Email không được để trống!");
    }

    if (!formData.password) {
      return toast.error("Mật khẩu không được để trống!");
    }

    try {
      await registerAPI(formData);

      toast.success("Đăng ký thành công! Vui lòng nhập OTP");
      setShowOTPModal(true);
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Đăng ký thất bại!";
      toast.error(msg);
    }
  };

  const handlSubmitOTP = async (otp) => {
    try {
      await verifyOTP({
        email: formData.email,
        otp: otp,
      });
      toast.success("Xác minh tài khoản thành công!");

      setShowOTPModal(false);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "OTP không hợp lệ!";
      toast.error(msg);
    }
  };

  const handlResendOTP = async () => {
    try {
      await resendOTP(formData.email);
      toast.success("Đã gửi mã OTP mới!");
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "OTP không hợp lệ!";
      toast.error(msg);
    }
  };

  return (
    <>
      <div className="auth-bg">
        {/* Aurora floating orbs */}
        <div className="auth-orb auth-orb-1"></div>
        <div className="auth-orb auth-orb-2"></div>
        <div className="auth-orb auth-orb-3"></div>
        <div className="auth-orb auth-orb-4"></div>
        <div className="auth-orb auth-orb-5"></div>

        {/* Dot grid overlay */}
        <div className="auth-grid"></div>

        {/* Light beam */}
        <div className="auth-beam"></div>

        {/* Floating particles */}
        <div className="auth-particles">
          <div className="auth-particle"></div>
          <div className="auth-particle"></div>
          <div className="auth-particle"></div>
          <div className="auth-particle"></div>
          <div className="auth-particle"></div>
          <div className="auth-particle"></div>
          <div className="auth-particle"></div>
          <div className="auth-particle"></div>
          <div className="auth-particle"></div>
          <div className="auth-particle"></div>
          <div className="auth-particle"></div>
          <div className="auth-particle"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row w-[90%] max-w-5xl rounded-2xl overflow-hidden bg-white auth-card-glow my-10">
          
          {/* Left Form Section */}
          <div className="md:w-1/2 w-full p-8 md:p-12 flex flex-col justify-center bg-white">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-50 mb-4 ring-8 ring-cyan-50/50">
                <GraduationCap className="w-8 h-8 text-cyan-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Tạo tài khoản
              </h1>
              <p className="text-gray-500 text-sm">
                Tham gia cộng đồng học tập của chúng tôi ngay hôm nay
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Họ và tên
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="Nguyễn Văn A"
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>

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
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Nhập mật khẩu"
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 mt-4"
              >
                Đăng ký
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
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="text-cyan-600 hover:text-cyan-700 font-semibold transition-colors"
              >
                Đăng nhập
              </Link>
            </p>
          </div>

          {/* Right Banner Section */}
          <div className="md:w-1/2 w-full hidden md:flex flex-col justify-center items-center bg-gradient-to-bl from-cyan-600 to-blue-800 p-12 text-center text-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white blur-3xl"></div>
            </div>

            <img
              src={signupIllustration}
              alt="Signup Illustration"
              className="w-full max-w-[280px] mx-auto drop-shadow-2xl mb-8 relative z-10 hover:scale-105 transition-transform duration-500"
            />
            <h2 className="text-3xl font-bold mb-4 relative z-10">
              Bắt đầu hành trình mới
            </h2>
            <p className="text-cyan-100 mb-8 max-w-sm relative z-10">
              Khai phá tiềm năng của bạn bằng vài bước đơn giản cùng hệ thống Danang Scholar.
            </p>
            <div className="flex justify-center gap-3 flex-wrap relative z-10">
              <span className="px-4 py-1.5 text-xs bg-white/10 backdrop-blur-md text-white font-medium rounded-full border border-white/20 shadow-sm">
                Truy cập mở
              </span>
              <span className="px-4 py-1.5 text-xs bg-white/10 backdrop-blur-md text-white font-medium rounded-full border border-white/20 shadow-sm">
                Thiết lập nhanh
              </span>
              <span className="px-4 py-1.5 text-xs bg-white/10 backdrop-blur-md text-white font-medium rounded-full border border-white/20 shadow-sm">
                Bảo mật cao
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* OTP */}
      {showOTPModal && (
        <OTPModal
          email={formData.email}
          onClose={() => setShowOTPModal(false)}
          onVerify={async (otp) => {
            handlSubmitOTP(otp);
          }}
          onResend={async () => {
            handlResendOTP();
          }}
        />
      )}
    </>
  );
}
