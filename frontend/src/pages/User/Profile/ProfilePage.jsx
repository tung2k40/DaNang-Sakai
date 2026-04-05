import { motion } from "framer-motion";
import { useAuth } from "../../../contexts/AuthContext";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import DocumentSection from "../Home/DocumentSection";
import ExamSection from "../Home/ExamSection";

export default function ProfilePage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("info");

    if (user?.role === 'admin') {
        return <Navigate to="/admin/documents" replace />;
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Đang tải thông tin...</p>
            </div>
        );
    }

    const getInitials = (name) => {
        if (!name) return "U";
        return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700">
                        Hồ sơ cá nhân
                    </h1>
                    <p className="text-gray-600 mt-2">Quản lý thông tin tài khoản của bạn</p>
                </motion.div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col md:flex-row min-h-[400px]">
                    {/* Sidebar / Top Info */}
                    <div className="md:w-1/3 bg-gray-50 p-8 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-32 h-32 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold font-serif mb-4 shadow-lg border-4 border-white"
                        >
                            {getInitials(user.fullName)}
                        </motion.div>
                        <h2 className="text-xl font-bold text-gray-800 text-center">{user.fullName}</h2>
                        <span className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${user.verified ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                            {user.verified ? (
                                <><i className="fa-solid fa-circle-check"></i> Đã xác thực email</>
                            ) : (
                                <><i className="fa-solid fa-triangle-exclamation"></i> Chưa xác thực</>
                            )}
                        </span>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:w-2/3 p-8">
                        <div className="flex border-b border-gray-200 mb-6">
                            <button
                                onClick={() => setActiveTab("info")}
                                className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${activeTab === "info" ? "border-blue-600 text-blue-700" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                            >
                                Thông tin chung
                            </button>
                            <button
                                onClick={() => setActiveTab("history")}
                                className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${activeTab === "history" ? "border-blue-600 text-blue-700" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                            >
                                Lịch sử Upload
                            </button>
                            <button
                                onClick={() => setActiveTab("settings")}
                                className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${activeTab === "settings" ? "border-blue-600 text-blue-700" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                            >
                                Thiết lập
                            </button>
                        </div>

                        {activeTab === "info" && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                                            <i className="fa-solid fa-user text-blue-400"></i> Họ và tên
                                        </p>
                                        <p className="font-medium text-gray-800">{user.fullName}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                                            <i className="fa-solid fa-envelope text-blue-400"></i> Email
                                        </p>
                                        <p className="font-medium text-gray-800">{user.email}</p>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                                    <i className="fa-solid fa-circle-info text-blue-500 mt-1"></i>
                                    <p className="text-sm text-blue-800 leading-relaxed">
                                        Chào mừng bạn đến với DaNang Scholar! Hồ sơ của bạn giữ an toàn thông tin cá nhân.
                                        Tại đây, bạn sẽ sớm có thể theo dõi các tài liệu đã lưu và kết quả luyện đề.
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "settings" && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col items-center justify-center py-10 text-gray-500 text-center"
                            >
                                <i className="fa-solid fa-screwdriver-wrench text-5xl text-gray-300 mb-4"></i>
                                <p>Tính năng thiết lập đang được phát triển.</p>
                                <p className="text-sm mt-1">Vui lòng quay lại sau nhé!</p>
                            </motion.div>
                        )}

                        {activeTab === "history" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-12"
                            >
                                <DocumentSection isMine={true} />
                                <ExamSection isMine={true} />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
