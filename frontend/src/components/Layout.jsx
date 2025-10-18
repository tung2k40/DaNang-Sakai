import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./sidebars/Sidebar";
import Footer from "./Footer";
import React from "react";

export default function Layout({ children }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔁 Khi chọn tài liệu hoặc đề thi => tự chuyển về /home
  useEffect(() => {
    if (selectedOption && location.pathname !== "/home") {
      navigate("/home");
    }
  }, [selectedOption, location.pathname, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar onSelect={setSelectedOption} />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 bg-gray-100">
            {children &&
              React.cloneElement(children, {
                selectedOption,
              })}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
