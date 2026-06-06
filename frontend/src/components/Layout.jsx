import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./sidebars/Sidebar";
import Footer from "./Footer";
import React from "react";
import ChatbotWindow from "./ui/ChatbotWindow";
import { useAuth } from "../contexts/AuthContext";

export default function Layout({ children }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Đóng sidebar khi chuyển route
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // 🔁 Khi chọn tài liệu hoặc đề thi => tự chuyển về /home
  useEffect(() => {
    if (selectedOption && location.pathname !== "/home") {
      navigate("/home");
    }
  }, [selectedOption, location.pathname, navigate]);

  const showSidebar = user && user.role !== "admin";

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Header onMenuClick={() => setSidebarOpen(true)} showMenuBtn={showSidebar} />
      <div className="flex flex-1 overflow-hidden pt-[72px]">
        {showSidebar && (
          <Sidebar
            onSelect={setSelectedOption}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <main className="flex-1 bg-gray-50">
            {children &&
              React.cloneElement(children, {
                selectedOption,
              })}
          </main>
          <Footer />
        </div>
      </div>
      <ChatbotWindow />
    </div>
  );
}
