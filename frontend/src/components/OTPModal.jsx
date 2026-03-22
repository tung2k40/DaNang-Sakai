import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function OTPModal({ email, onClose, onVerify, onResend }) {
    const [otp, setOtp] = useState("");
    const [countdown, setCountdown] = useState(90); // 1m30s

    const canResend = countdown === 0;
    const inputs = Array(6).fill(0);

    // Xử lý nhập OTP từng ô
    const handleChange = (e, index) => {
        const val = e.target.value.replace(/\D/g, "");
        if (!val) return;

        const newOtp = otp.split("");
        newOtp[index] = val[0];
        const updated = newOtp.join("");
        setOtp(updated);

        // focus ô tiếp theo
        if (index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    // Xử lý Backspace
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            const newOtp = otp.split("");
            newOtp[index] = "";
            setOtp(newOtp.join(""));

            if (index > 0) {
                document.getElementById(`otp-${index - 1}`).focus();
            }
        }
    };

    // Countdown timer
    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    const handleResend = async () => {
        if (!canResend) return;
        await onResend();
        setCountdown(90);
    };

    const handleVerify = (e) => {
        e.preventDefault();
        onVerify(otp);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-5 relative">

                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                    onClick={onClose}
                >
                    <X size={22} />
                </button>

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                    Xác thực OTP
                </h2>

                <p className="text-center text-gray-600 mb-4">
                    Mã OTP đã được gửi đến <span className="font-semibold">{email}</span>
                </p>

                {/* Warning Message */}
                <div className="bg-orange-50 border border-orange-200 text-orange-800 text-sm px-4 py-3 rounded-xl mb-6">
                    <p className="flex items-center gap-2 font-medium mb-1">
                        <i className="fa-solid fa-triangle-exclamation text-orange-500"></i> Lưu ý quan trọng
                    </p>
                    <p>Tài khoản chưa xác thực sẽ tự động bị xóa khỏi hệ thống sau <strong>3 ngày</strong>. Vui lòng xác thực ngay!</p>
                </div>

                {/* OTP Input */}
                <div className="flex justify-center gap-3 my-6">
                    {inputs.map((_, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            maxLength={1}
                            value={otp[index] || ""}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="
                                w-12 h-12 
                                text-center text-2xl font-semibold
                                rounded-2xl
                                border border-gray-300 
                                bg-white
                                focus:border-cyan-600 
                                focus:ring-2 focus:ring-cyan-300
                                focus:outline-none
                                shadow-sm
                            "
                        />
                    ))}
                </div>

                {/* Verify Button */}
                <button
                    onClick={handleVerify}
                    className="w-full bg-cyan-600 text-white py-3 rounded-xl font-semibold hover:bg-cyan-700 transition"
                >
                    Xác minh
                </button>

                {/* Resend OTP */}
                <div className="text-center mt-4">
                    {canResend ? (
                        <button
                            onClick={handleResend}
                            className="text-cyan-600 font-semibold hover:underline"
                        >
                            Gửi lại mã OTP
                        </button>
                    ) : (
                        <p className="text-gray-500 text-sm">
                            Gửi lại OTP sau{" "}
                            <span className="font-bold">{formatTime(countdown)}</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
