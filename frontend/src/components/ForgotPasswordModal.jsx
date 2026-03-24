import { useState } from "react";
import { X, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { forgotPasswordAPI, resetPasswordAPI } from "../api/authAPI";

export default function ForgotPasswordModal({ onClose }) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (!email) return toast.error("Vui lòng nhập email!");
        try {
            setIsLoading(true);
            const res = await forgotPasswordAPI(email);
            toast.success(res.message || "Đã gửi mã OTP!");
            setStep(2);
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Lỗi gửi email");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) return toast.error("Vui lòng nhập đúng 6 số OTP");
        setStep(3);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!newPassword || newPassword.length < 6) return toast.error("Mật khẩu mới phải có ít nhất 6 ký tự!");
        try {
            setIsLoading(true);
            const res = await resetPasswordAPI({ email, otp, newPassword });
            toast.success(res.message || "Đặt lại mật khẩu thành công!");
            onClose();
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Lỗi đặt lại mật khẩu");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-6 relative">
                <button className="absolute top-4 right-4 text-gray-500 hover:text-red-500" onClick={onClose}>
                    <X size={22} />
                </button>

                {step === 1 && (
                    <form onSubmit={handleSendOTP}>
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Quên mật khẩu</h2>
                        <p className="text-center text-gray-600 mb-6">Nhập email của bạn để nhận mã khôi phục</p>
                        <div className="relative mb-4">
                            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nhập địa chỉ Email" className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 outline-none" required />
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-cyan-600 text-white font-bold py-3 rounded-xl hover:bg-cyan-700 disabled:bg-gray-400">
                            {isLoading ? "Đang gửi..." : "Gửi mã xác nhận"}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOTP}>
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Nhập mã OTP</h2>
                        <p className="text-center text-gray-600 mb-6">Mã 6 số đã được gửi đến {email}</p>
                        <div className="mb-4">
                            <input type="text" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} placeholder="Nhập 6 số OTP" className="w-full text-center text-2xl tracking-widest font-semibold py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 outline-none" required />
                        </div>
                        <button type="submit" className="w-full bg-cyan-600 text-white font-bold py-3 rounded-xl hover:bg-cyan-700">
                            Tiếp tục
                        </button>
                        <button type="button" onClick={() => setStep(1)} className="w-full mt-3 text-gray-500 hover:text-cyan-600 font-medium">Quay lại</button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleResetPassword}>
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Tạo mật khẩu mới</h2>
                        <p className="text-center text-gray-600 mb-6">Mật khẩu phải có chữ hoa, thường, số, ký tự đặc biệt.</p>
                        <div className="relative mb-4">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Nhập mật khẩu mới" className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 outline-none" required />
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-cyan-600 text-white font-bold py-3 rounded-xl hover:bg-cyan-700 disabled:bg-gray-400">
                            {isLoading ? "Đang đổi..." : "Lưu mật khẩu mới"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
