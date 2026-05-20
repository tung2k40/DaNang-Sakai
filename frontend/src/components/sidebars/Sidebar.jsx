import { useState } from "react";
import GroupItem from "./GroupItem";


function Sidebar({ onSelect }) {
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

  return (
    <aside className={`${isCollapsed ? 'w-16 items-center' : 'w-64'} bg-white p-4 border-r border-gray-200 shadow-sm transition-all duration-300 flex flex-col overflow-hidden`}>
      <div className={`flex items-center mb-4 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
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
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </aside>
  );
}

export default Sidebar;
