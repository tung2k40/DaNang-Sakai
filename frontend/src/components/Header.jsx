import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logoutAPI } from "../api/authAPI";
import Confirm from "../components/ui/Confirm";
import logo from "../assets/images/logo.jpg";

export default function Header() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

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

        {/* NAV khi chưa login */}
        {!user && (
          <nav>
            <ul className="flex gap-6 text-gray-700">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-600 font-medium transition-colors"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-600 font-medium transition-colors"
                >
                  Về chúng tôi
                </Link>
              </li>
            </ul>
          </nav>
        )}

        {/* NAV khi đã login */}
        {user && (
          <div
            className="relative group"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <div className="cursor-pointer text-gray-700 font-medium group-hover:text-blue-600 transition">
              Xin chào, <span className="font-semibold">{user.fullName}</span>
            </div>

            <div className="absolute left-0 right-0 h-4 top-full"></div>

            <div
              className={`absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-gray-200 
              transition-all duration-200 origin-top-right z-50
              ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 pointer-events-none translate-y-1"}`}
            >
              <button
                onClick={() => navigate("/about")}
                className="block w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-t-xl transition"
              >
                Về chúng tôi
              </button>

              <button
                onClick={() => setOpenConfirm(true)}
                className="block w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-b-xl transition"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        )}
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
    </>
  );
}
