import { useEffect, useState } from "react";
import {
  getPendingDocumentsAPI,
  updateDocumentStatusAPI,
} from "../../api/documentAPI";
import {
  CheckCircle,
  XCircle,
  FileText,
  User,
  Calendar,
  BookOpen,
  FileQuestion,
} from "lucide-react";
import toast from "react-hot-toast";

export default function AdminDocumentReview() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const data = await getPendingDocumentsAPI();
      setDocuments(data);
    } catch (err) {
      toast.error(err.message || "Lỗi khi lấy danh sách tài liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateDocumentStatusAPI(id, status);
      toast.success(
        `Đã ${status === "approved" ? "phê duyệt" : "từ chối"} tài liệu thành công`,
      );
      // Lọc bỏ document đã xử lý khỏi danh sách
      setDocuments((prev) => prev.filter((doc) => doc._id !== id));
    } catch (err) {
      toast.error(err.message || "Có lỗi xảy ra khi cập nhật trạng thái");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
              <FileQuestion className="w-8 h-8 text-blue-600" />
              Duyệt Tài Liệu
            </h1>
            <p className="mt-2 text-gray-500 font-medium">
              Quản lý và kiểm duyệt các tài liệu được tải lên bởi người dùng
              trước khi hiển thị công khai.
            </p>
          </div>
          <div className="bg-blue-50 px-5 py-3 rounded-2xl flex items-center gap-3 border border-blue-100">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-blue-700 font-semibold">
              {documents.length} tài liệu chờ duyệt
            </span>
          </div>
        </div>

        {/* Content Section */}
        {documents.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Tuyệt vời!
            </h3>
            <p className="text-gray-500 text-lg">
              Hiện tại không có tài liệu nào cần phải phê duyệt.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <div
                key={doc._id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold tracking-wide uppercase">
                    {doc.type}
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(doc.createdAt).toLocaleDateString("vi-VN")}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
                  {doc.title}
                </h3>

                <p className="text-gray-500 text-sm line-clamp-3 mb-5 flex-grow">
                  {doc.description}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600 gap-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-700">
                      Môn học:
                    </span>{" "}
                    {doc.subject}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-700">
                      Người tải lên:
                    </span>
                    {doc.uploadedBy?.fullName || "Người dùng ẩn danh"}
                  </div>
                </div>

                <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex text-sm items-center justify-center flex-1 gap-1.5 py-2.5 px-4 bg-gray-50 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <FileText className="w-4 h-4" />
                    Xem file
                  </a>
                  <button
                    onClick={() => handleUpdateStatus(doc._id, "approved")}
                    className="flex text-sm items-center justify-center gap-1.5 py-2.5 px-4 bg-green-50 text-green-700 font-medium rounded-xl hover:bg-green-100 transition-colors border border-green-200"
                    title="Phê duyệt"
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(doc._id, "rejected")}
                    className="flex text-sm items-center justify-center gap-1.5 py-2.5 px-4 bg-red-50 text-red-700 font-medium rounded-xl hover:bg-red-100 transition-colors border border-red-200"
                    title="Từ chối"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
