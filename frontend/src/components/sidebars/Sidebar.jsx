import { useState } from "react";
import GroupItem from "./GroupItem";

function Sidebar() {
  const [openGroup, setOpenGroup] = useState(null);
  const [openSubject, setOpenSubject] = useState(null);

  // 🎯 Dữ liệu có icon + màu cho từng môn
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
    <aside className="w-64 bg-white h-screen p-4 border-r border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <i className="fa-solid fa-layer-group text-indigo-500"></i>
        Danh mục môn học
      </h2>

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
          />
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
