import { useState } from "react";
import { uploadExamAPI } from "../api/examAPI";

export default function UploadExamModal({ isOpen, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        subject: "",
        type: "PDF",
        author: "",
        file: null,
        fileUrl: "",
    });
    const [uploadMethod, setUploadMethod] = useState("file"); // "file" or "link"
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
            
            if (uploadMethod === "file" && formData.file) {
                data.append("file", formData.file);
            } else if (uploadMethod === "link" && formData.fileUrl) {
                data.append("fileUrl", formData.fileUrl);
            }

            await uploadExamAPI(data);
            setLoading(false);
            if (onSuccess) onSuccess();
            onClose();
        } catch (err) {
            setLoading(false);
            setError(err.message || "Tải đề thi thất bại!");
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <h2 className="text-xl font-bold text-gray-800">Tải lên đề thi</h2>
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
                        <label className="text-sm font-semibold text-gray-700">Người đăng / Giảng viên</label>
                        <input
                            type="text"
                            name="author"
                            required
                            placeholder="Nhập tên người đăng đề"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Tên đề thi</label>
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
                            <select
                                name="subject"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                            >
                                <option value="" disabled>Chọn môn học</option>
                                <optgroup label="Khối tự nhiên">
                                    <option value="Toán học">Toán học</option>
                                    <option value="Vật lý">Vật lý</option>
                                    <option value="Hóa học">Hóa học</option>
                                    <option value="Sinh học">Sinh học</option>
                                    <option value="Tin học">Tin học</option>
                                </optgroup>
                                <optgroup label="Khối xã hội">
                                    <option value="Ngữ văn">Ngữ văn</option>
                                    <option value="Lịch sử">Lịch sử</option>
                                    <option value="Địa lý">Địa lý</option>
                                    <option value="Giáo dục công dân">Giáo dục công dân</option>
                                    <option value="Ngoại ngữ">Ngoại ngữ</option>
                                </optgroup>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Loại đề</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                            >
                                <option value="PDF">PDF (File cứng)</option>
                                <option value="Word">Word (Bản mềm)</option>
                                <option value="Quiz">Quiz (Trắc nghiệm)</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Mô tả thêm</label>
                        <textarea
                            name="description"
                            required
                            rows="3"
                            placeholder="Mô tả cấu trúc đề, năm thi..."
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                        ></textarea>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-gray-700">Nguồn đề thi</label>
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button
                                    type="button"
                                    onClick={() => setUploadMethod("file")}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition ${uploadMethod === "file" ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                                >
                                    Tải file
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUploadMethod("link")}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition ${uploadMethod === "link" ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                                >
                                    Gắn link
                                </button>
                            </div>
                        </div>

                        {uploadMethod === "file" ? (
                            <input
                                type="file"
                                onChange={handleFileChange}
                                required={uploadMethod === "file"}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
                            />
                        ) : (
                            <input
                                type="url"
                                name="fileUrl"
                                placeholder="Nhập link Google Drive, OneDrive..."
                                value={formData.fileUrl}
                                onChange={handleChange}
                                required={uploadMethod === "link"}
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                            />
                        )}
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
