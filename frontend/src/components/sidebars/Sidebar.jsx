import { useState } from "react";
import GroupItem from "./GroupItem";

function Sidebar({ onSelect, isOpen, onClose }) {
  const [openGroup, setOpenGroup] = useState(null);
  const [openSubject, setOpenSubject] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const data = {
    "Khối tự nhiên": [
      { name: "Toán học", icon: "fa-solid fa-square-root-variable", color: "text-indigo-500" },
      { name: "Vật lý", icon: "fa-solid fa-bolt", color: "text-yellow-500" },
      { name: "Hóa học", icon: "fa-solid fa-flask", color: "text-green-500" },
      { name: "Sinh học", icon: "fa-solid fa-leaf", color: "text-emerald-500" },
      { name: "Tin học", icon: "fa-solid fa-computer", color: "text-blue-500" },
    ],
    "Khối xã hội": [
      { name: "Ngữ văn", icon: "fa-solid fa-book", color: "text-rose-500" },
      { name: "Lịch sử", icon: "fa-solid fa-landmark", color: "text-amber-700" },
      { name: "Địa lý", icon: "fa-solid fa-globe-asia", color: "text-teal-500" },
      { name: "Giáo dục công dân", icon: "fa-solid fa-scale-balanced", color: "text-purple-500" },
      { name: "Ngoại ngữ", icon: "fa-solid fa-language", color: "text-orange-500" },
    ],
  };

  const handleSelect = (option) => {
    onSelect(option);
    // Đóng drawer trên mobile sau khi chọn
    if (onClose) onClose();
  };

  const sidebarContent = (
    <aside
      className={`
        h-full flex-shrink-0 bg-white border-r border-gray-200 shadow-sm
        transition-all duration-300 flex flex-col overflow-y-auto
        ${isCollapsed ? "w-16 items-center p-2" : "w-64 p-4"}
      `}
    >
      <div className={`flex items-center mb-4 ${isCollapsed ? "justify-center" : "justify-between"}`}>
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 whitespace-nowrap">
            <i className="fa-solid fa-layer-group text-indigo-500"></i>
            Danh mục
          </h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
          title={isCollapsed ? "Mở danh mục" : "Thu gọn"}
        >
          <i className="fa-solid fa-bars text-xl"></i>
        </button>
      </div>

      {!isCollapsed && (
        <ul className="space-y-2 overflow-y-auto">
          {Object.keys(data).map((group) => (
            <GroupItem
              key={group}
              group={group}
              subjects={data[group]}
              openGroup={openGroup}
              setOpenGroup={setOpenGroup}
              openSubject={openSubject}
              setOpenSubject={setOpenSubject}
              onSelect={handleSelect}
            />
          ))}
        </ul>
      )}
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar - always visible md+ */}
      <div className="hidden md:flex h-full">
        {sidebarContent}
      </div>

      {/* Mobile drawer overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Drawer panel */}
          <div className="relative z-50 w-72 max-w-[85vw] h-full bg-white shadow-2xl flex flex-col overflow-y-auto animate-slide-in-left">
            {/* Mobile header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <i className="fa-solid fa-layer-group text-indigo-500"></i>
                Danh mục
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <ul className="space-y-2">
                {Object.keys(data).map((group) => (
                  <GroupItem
                    key={group}
                    group={group}
                    subjects={data[group]}
                    openGroup={openGroup}
                    setOpenGroup={setOpenGroup}
                    openSubject={openSubject}
                    setOpenSubject={setOpenSubject}
                    onSelect={handleSelect}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
