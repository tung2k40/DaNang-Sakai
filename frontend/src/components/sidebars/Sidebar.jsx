import { useState } from "react";
import GroupItem from "./GroupItem";

function Sidebar() {
  const [openGroup, setOpenGroup] = useState(null);
  const [openSubject, setOpenSubject] = useState(null);

  const data = {
    "Khối tự nhiên": ["Toán học", "Vật lý", "Hóa học", "Sinh học", "Tin học"],
    "Khối xã hội": [
      "Ngữ văn",
      "Lịch sử",
      "Địa lý",
      "Giáo dục công dân",
      "Ngoại ngữ",
    ],
  };

  return (
    <aside className="w-64 bg-gray-50 h-screen p-4 border-r border-gray-200 shadow-sm">
      <ul className="space-y-3">
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
