import { useState } from "react";
import { uploadDocumentAPI } from "../api/documentAPI";

export default function UploadDocumentModal({ isOpen, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        subject: "",
        type: "PDF",
        author: "",
        file: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("subject", formData.subject);
            data.append("type", formData.type);
            data.append("author", formData.author);
            if (formData.file) {
                data.append("file", formData.file);
            }

            await uploadDocumentAPI(data);
            setLoading(false);
            if (onSuccess) onSuccess();
            onClose();
        } catch (err) {
            setLoading(false);
            setError(err.message || "Tải tài liệu thất bại!");
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <h2 className="text-xl font-bold text-gray-800">Tải lên tài liệu</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-full transition-colors"
                    >
                        <i className="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                            {error}
                        </div>
                    )}
                    
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Tên tác giả</label>
                        <input
                            type="text"
                            name="author"
                            required
                            placeholder="Nhập tên của bạn"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Tiêu đề tài liệu</label>
                        <input
                            type="text"
                            name="title"
                            required
                            placeholder="Ví dụ: Đề thi KSTN Toán học"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Môn học</label>
                            <input
                                type="text"
                                name="subject"
                                required
                                placeholder="Toán, Lý, Hoá..."
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Loại báo cáo</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                            >
                                <option value="PDF">PDF (Tài liệu)</option>
                                <option value="Slide">Slide (Bài giảng)</option>
                                <option value="Video">Video</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Mô tả</label>
                        <textarea
                            name="description"
                            required
                            rows="3"
                            placeholder="Giới thiệu đôi nét về tài liệu này..."
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                        ></textarea>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Chọn file</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            required
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                        />
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading && <i className="fa-solid fa-spinner animate-spin"></i>}
                            {loading ? "Đang tải..." : "Tải lên"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
