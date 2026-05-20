import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logoutAPI } from "../api/authAPI";
import Confirm from "../components/ui/Confirm";
import UploadDocumentModal from "./UploadDocumentModal";
import UploadExamModal from "./UploadExamModal";
import logo from "../assets/images/logo.jpg";
import { toast } from "react-hot-toast";

export default function Header() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [openExamUpload, setOpenExamUpload] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutAPI();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center hover:opacity-80 transition">
            <img className="w-10 h-10 mr-2 rounded-full" src={logo} alt="Logo" />
            <h1 className="text-xl font-bold text-blue-600">DaNang Scholar</h1>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav>
          <ul className="flex gap-6 text-gray-700 items-center">
            {/* Navigation links could go here in the future if needed */}
          </ul>
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {!user ? (
            <Link
              to="/login"
              className="px-5 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition"
            >
              Đăng nhập
            </Link>
          ) : (
            <>
              {user?.role !== 'admin' && (
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={() => setOpenUpload(true)}
                    className="px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-full border border-blue-200 hover:bg-blue-100 hover:shadow-sm transition items-center gap-2"
                  >
                    <i className="fa-solid fa-cloud-arrow-up"></i> Tải tài liệu
                  </button>
                  <button
                    onClick={() => setOpenExamUpload(true)}
                    className="px-4 py-2 bg-green-50 text-green-700 font-semibold rounded-full border border-green-200 hover:bg-green-100 hover:shadow-sm transition items-center gap-2 flex"
                  >
                    <i className="fa-solid fa-file-arrow-up"></i> Tải đề thi
                  </button>
                </div>
              )}
              <div
                className="relative group flex items-center gap-3 cursor-pointer"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
              <div className="text-gray-700 font-medium group-hover:text-blue-600 transition flex items-center gap-2">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-8 h-8 rounded-full border border-gray-200 object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center border border-blue-200">
                    {user.fullName ? user.fullName[0].toUpperCase() : "U"}
                  </div>
                )}
                <span className="hidden sm:inline">Xin chào, <span className="font-semibold">{user.fullName}</span></span>
              </div>

              <div className="absolute left-0 right-0 h-4 top-full"></div>

              <div
                className={`absolute right-0 mt-1 top-full w-48 bg-white rounded-xl shadow-xl border border-gray-200 
                transition-all duration-200 origin-top-right z-50
                ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 pointer-events-none translate-y-1"}`}
              >
                <div className="px-4 py-3 border-b border-gray-100 sm:hidden">
                    <p className="text-sm text-gray-500">Đăng nhập với tên</p>
                    <p className="font-semibold text-gray-800 line-clamp-1">{user.fullName}</p>
                </div>
                
                {user?.role !== 'admin' && (
                  <button
                    onClick={() => navigate("/profile")}
                    className="block w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition flex items-center gap-2"
                  >
                    <i className="fa-solid fa-user text-blue-500"></i> Hồ sơ cá nhân
                  </button>
                )}

                {user?.role === 'admin' && (
                  <button
                    onClick={() => navigate("/admin/documents")}
                    className="block w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition flex items-center gap-2 font-semibold"
                  >
                    <i className="fa-solid fa-shield-halved text-blue-600"></i> Quản trị viên
                  </button>
                )}

                {user?.role !== 'admin' && (
                  <>
                    <button
                      onClick={() => setOpenUpload(true)}
                      className="block sm:hidden w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition flex items-center gap-2"
                    >
                      <i className="fa-solid fa-cloud-arrow-up text-blue-500"></i> Tải tài liệu
                    </button>

                    <button
                      onClick={() => setOpenExamUpload(true)}
                      className="block sm:hidden w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-green-600 transition flex items-center gap-2"
                    >
                      <i className="fa-solid fa-file-arrow-up text-green-500"></i> Tải đề thi
                    </button>
                  </>
                )}

                <button
                  onClick={() => setOpenConfirm(true)}
                  className="block w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-b-xl transition flex items-center gap-2"
                >
                  <i className="fa-solid fa-right-from-bracket"></i> Đăng xuất
                </button>
              </div>
            </div>
            </>
          )}
        </div>
      </header>

      {/* Confirm Logout */}
      {openConfirm && (
        <Confirm
          title="Xác nhận đăng xuất"
          message="Bạn có chắc chắn muốn đăng xuất không?"
          onCancel={() => setOpenConfirm(false)}
          onConfirm={() => {
            setOpenConfirm(false);
            handleLogout();
          }}
        />
      )}

      {/* Upload Document Modal */}
      <UploadDocumentModal 
        isOpen={openUpload} 
        onClose={() => setOpenUpload(false)} 
        onSuccess={() => {
          toast.success('Tải lên tài liệu thành công!');
        }} 
      />

      {/* Upload Exam Modal */}
      <UploadExamModal 
        isOpen={openExamUpload} 
        onClose={() => setOpenExamUpload(false)} 
        onSuccess={() => {
          toast.success('Tải lên đề thi thành công!');
        }} 
      />
    </>
  );
}
