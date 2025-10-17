import OptionItem from "./OptionItem";

function SubjectItem({ subject, openSubject, setOpenSubject, onSelect }) {
  const isOpen = openSubject === subject.name;
  const toggleSubject = () => setOpenSubject(isOpen ? null : subject.name);

  return (
    <li>
      <button
        onClick={toggleSubject}
        className={`w-full flex justify-between items-center py-1.5 px-3 hover:bg-gray-100 rounded text-sm text-gray-700 ${
          isOpen ? "bg-gray-100" : ""
        }`}
      >
        <span className="flex items-center gap-2">
          <i className={`${subject.icon} ${subject.color}`}></i>
          {subject.name}
        </span>
        <i
          className={`fa-solid fa-angle-${isOpen ? "up" : "down"} text-gray-400 text-xs`}
        />
      </button>

      {isOpen && (
        <ul className="ml-9 mt-1 space-y-1">
          <OptionItem
            icon="fa-solid fa-file-lines"
            label="Tài liệu"
            color="text-blue-500"
            onClick={() => onSelect({ type: "tailieu", subject: subject.name })}
          />
          <OptionItem
            icon="fa-solid fa-file-pen"
            label="Đề thi"
            color="text-green-500"
            onClick={() => onSelect({ type: "dethi", subject: subject.name })}
          />
        </ul>
      )}
    </li>
  );
}

export default SubjectItem;
