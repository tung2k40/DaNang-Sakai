import SubjectItem from "./SubjectItem";

function GroupItem({ group, subjects, openGroup, setOpenGroup, openSubject, setOpenSubject , onSelect }) {
  const isOpen = openGroup === group;

  return (
    <li>
      <button
        onClick={() => setOpenGroup(isOpen ? null : group)}
        className="w-full flex justify-between items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 font-medium"
      >
        <span>{group}</span>
        <i className={`fa-solid fa-chevron-${isOpen ? "up" : "down"} text-gray-500 text-sm`} />
      </button>

      {isOpen && (
        <ul className="ml-4 mt-2 space-y-1">
          {subjects.map((subject) => (
            <SubjectItem
              key={subject.name}
              subject={subject}
              openSubject={openSubject}
              setOpenSubject={setOpenSubject}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default GroupItem;
