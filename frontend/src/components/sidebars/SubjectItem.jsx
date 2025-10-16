import OptionItem from "./OptionItem";

function SubjectItem({ subject, openSubject, setOpenSubject }) {
  const toggleSubject = () => {
    setOpenSubject(openSubject === subject ? null : subject);
  };

  return (
    <li>
      <button
        onClick={toggleSubject}
        className="w-full flex justify-between items-center py-1.5 px-3 hover:bg-gray-100 rounded text-sm text-gray-700"
      >
        <span >{subject}</span>
       
      </button>

      {openSubject === subject && (
        <ul className="ml-5 mt-1 space-y-1">
          <OptionItem 
          icon="ti ti-book" 
          label="Tài liệu" 
          color="text-blue-500" 
          />
          <OptionItem
            icon="ti ti-clipboard"
            label="Đề thi"
            color="text-green-500"
          />
        </ul>
      )}
    </li>
  );
}
export default SubjectItem;
