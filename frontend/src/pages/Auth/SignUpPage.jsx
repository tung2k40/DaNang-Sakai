import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import signupIllustration from "../../assets/images/signup.png";
import backgroundlogin from "../../assets/images/bglogin.jpg";
import OTPModal from "../../components/OTPModal";
import toast from "react-hot-toast";
import { registerAPI, verifyOTP, resendOTP } from "../../api/authAPI";

export default function SignUpPage() {
  const [showOTPModal, setShowOTPModal] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

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
      {" "}
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
                Tạo tài khoản
              </h1>
              <p className="text-gray-500 mt-1">
                Tham gia cộng đồng học tập của chúng tôi ngay hôm nay
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="Nguyễn Văn A"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

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
                Đăng ký
              </button>
            </form>

            <p className="text-center mt-5 text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="text-cyan-600 hover:text-cyan-700 font-semibold"
              >
                Đăng nhập
              </Link>
            </p>
          </div>

          <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-blue-50/70 p-10 text-center">
            <img
              src={signupIllustration}
              alt="Signup Illustration"
              className="w-full max-w-xs mx-auto drop-shadow-xl"
            />
            <h3 className="mt-6 text-2xl font-bold text-cyan-700">
              Bắt đầu hành trình của bạn ngay hôm nay
            </h3>
            <p className="text-gray-600 mt-2 mb-4 text-sm">
              Khai phá tiềm năng của bạn bằng vài bước đơn giản.
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <span className="px-3 py-1 text-xs bg-cyan-200/80 text-cyan-800 font-medium rounded-full">
                Truy cập miễn phí
              </span>
              <span className="px-3 py-1 text-xs bg-cyan-200/80 text-cyan-800 font-medium rounded-full">
                Thiết lập nhanh
              </span>
              <span className="px-3 py-1 text-xs bg-cyan-200/80 text-cyan-800 font-medium rounded-full">
                Riêng tư & Bảo mật
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
