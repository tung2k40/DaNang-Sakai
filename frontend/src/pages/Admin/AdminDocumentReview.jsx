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
  Sparkles,
  X,
  Star,
  AlertTriangle,
  ShieldCheck,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";

export default function AdminDocumentReview() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewingId, setReviewingId] = useState(null); // id đang gọi AI
  const [aiResult, setAiResult] = useState(null);       // kết quả AI để show modal

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
      setDocuments((prev) => prev.filter((doc) => doc._id !== id));
      setAiResult(null); // đóng modal nếu đang mở
    } catch (err) {
      toast.error(err.message || "Có lỗi xảy ra khi cập nhật trạng thái");
    }
  };

  const handleAiReview = async (docId) => {
    setReviewingId(docId);
    try {
      const res = await axiosInstance.post(`/documents/admin/${docId}/ai-review`);
      setAiResult(res.data.data);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Lỗi không xác định";
      toast.error(`Lỗi AI: ${errorMsg}`, { duration: 6000 });
      console.error("AI Review error:", err.response?.data || err);
    } finally {
      setReviewingId(null);
    }
  };

  const getRecommendationStyle = (rec) => {
    if (rec === "DUYỆT") return { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", icon: <ThumbsUp className="w-5 h-5" /> };
    if (rec === "TỪ CHỐI") return { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", icon: <ThumbsDown className="w-5 h-5" /> };
    return { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", icon: <HelpCircle className="w-5 h-5" /> };
  };

  const getScoreColor = (score) => {
    if (score >= 8) return "text-green-600";
    if (score >= 5) return "text-yellow-500";
    return "text-red-500";
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
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
              <FileQuestion className="w-8 h-8 text-blue-600" />
              Duyệt Tài Liệu
            </h1>
            <p className="mt-2 text-gray-500 font-medium">
              Quản lý và kiểm duyệt các tài liệu. Dùng AI để phân tích nhanh trước khi quyết định.
            </p>
          </div>
          <div className="bg-blue-50 px-5 py-3 rounded-2xl flex items-center gap-3 border border-blue-100">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-blue-700 font-semibold">
              {documents.length} tài liệu chờ duyệt
            </span>
          </div>
        </div>

        {/* Content */}
        {documents.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Tuyệt vời!</h3>
            <p className="text-gray-500 text-lg">Hiện tại không có tài liệu nào cần phê duyệt.</p>
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
                    <span className="font-medium text-gray-700">Môn học:</span>{" "}
                    {doc.subject}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-700">Người tải lên:</span>
                    {doc.uploadedBy?.fullName || "Người dùng ẩn danh"}
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-gray-100">
                  {/* AI Review Button */}
                  <button
                    onClick={() => handleAiReview(doc._id)}
                    disabled={reviewingId === doc._id}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow-md"
                  >
                    {reviewingId === doc._id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        AI đang phân tích...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Phân tích bằng AI
                      </>
                    )}
                  </button>

                  <div className="flex gap-2">
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex text-sm items-center justify-center flex-1 gap-1.5 py-2.5 px-3 bg-gray-50 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors border border-gray-200"
                    >
                      <FileText className="w-4 h-4" />
                      Xem file
                    </a>
                    <button
                      onClick={() => handleUpdateStatus(doc._id, "approved")}
                      className="flex text-sm items-center justify-center gap-1.5 py-2.5 px-3 bg-green-50 text-green-700 font-medium rounded-xl hover:bg-green-100 transition-colors border border-green-200"
                      title="Phê duyệt"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(doc._id, "rejected")}
                      className="flex text-sm items-center justify-center gap-1.5 py-2.5 px-3 bg-red-50 text-red-700 font-medium rounded-xl hover:bg-red-100 transition-colors border border-red-200"
                      title="Từ chối"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Review Result Modal */}
      {aiResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-violet-500 to-indigo-600 p-6 text-white flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-bold text-lg">Kết quả phân tích AI</span>
                </div>
                <p className="text-violet-200 text-sm line-clamp-1">{aiResult.document.title}</p>
              </div>
              <button
                onClick={() => setAiResult(null)}
                className="text-white/80 hover:text-white transition-colors mt-0.5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Score + Recommendation */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-gray-50 border border-gray-100 shrink-0">
                  <span className={`text-4xl font-black ${getScoreColor(aiResult.analysis.score)}`}>
                    {aiResult.analysis.score}
                  </span>
                  <span className="text-xs text-gray-400 font-medium mt-0.5">/ 10</span>
                  <div className="flex gap-0.5 mt-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-3 h-3 ${aiResult.analysis.score >= s*2 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  {(() => {
                    const style = getRecommendationStyle(aiResult.analysis.recommendation);
                    return (
                      <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border ${style.bg} ${style.border}`}>
                        <span className={style.text}>{style.icon}</span>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Khuyến nghị</p>
                          <p className={`text-lg font-black ${style.text}`}>{aiResult.analysis.recommendation}</p>
                        </div>
                      </div>
                    );
                  })()}
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    {aiResult.analysis.subjectMatch
                      ? <span className="flex items-center gap-1 text-green-600"><ShieldCheck className="w-4 h-4"/> Nội dung khớp môn học</span>
                      : <span className="flex items-center gap-1 text-orange-500"><AlertTriangle className="w-4 h-4"/> Nội dung không khớp môn học</span>
                    }
                  </div>
                </div>
              </div>

              {/* Analysis Details */}
              <div className="space-y-3 text-sm">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="font-semibold text-blue-800 mb-1">📝 Phân tích chất lượng</p>
                  <p className="text-blue-700">{aiResult.analysis.qualityAnalysis}</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                  <p className="font-semibold text-orange-800 mb-1">🛡️ Đánh giá rủi ro</p>
                  <p className="text-orange-700">{aiResult.analysis.riskAnalysis}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="font-semibold text-gray-700 mb-1">💡 Lý do khuyến nghị</p>
                  <p className="text-gray-600">{aiResult.analysis.reason}</p>
                </div>
              </div>
            </div>

            {/* Modal Footer - Action buttons */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => handleUpdateStatus(aiResult.document._id, "approved")}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors shadow-sm"
              >
                <CheckCircle className="w-5 h-5" />
                Duyệt tài liệu
              </button>
              <button
                onClick={() => handleUpdateStatus(aiResult.document._id, "rejected")}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors shadow-sm"
              >
                <XCircle className="w-5 h-5" />
                Từ chối
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
