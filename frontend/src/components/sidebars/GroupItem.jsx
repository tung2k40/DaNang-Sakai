import SubjectItem from "./SubjectItem";
function GroupItem({
  group,
  subjects,
  openGroup,
  setOpenGroup,
  openSubject,
  setOpenSubject,
}) {
  const toggleGroup = () => {
    setOpenGroup(openGroup === group ? null : group);
    setOpenSubject(null);
  };

  return (
    <li>
      <button
        onClick={toggleGroup}
        className="w-full flex justify-between items-center py-2 px-3 hover:bg-gray-200 rounded-lg font-semibold text-gray-800"
      >
        <span>{group}</span>
        <i
          className={`ti ti-angle-${
            openGroup === group ? "down" : "right"
          } text-gray-600`}
        ></i>
      </button>

      {openGroup === group && (
        <ul className="ml-3 mt-2 space-y-1 border-l border-gray-300 pl-2 animate-fade-in">
          {subjects.map((subject) => (
            <SubjectItem
              key={subject}
              subject={subject}
              openSubject={openSubject}
              setOpenSubject={setOpenSubject}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
export default GroupItem;
