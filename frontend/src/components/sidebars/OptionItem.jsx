function OptionItem({ icon, label, color }) {
  return (
    <li className="flex items-center gap-2 py-1 px-3 hover:bg-gray-200 rounded cursor-pointer text-sm text-gray-600">
      <i className={`${icon} ${color}`}></i>
      {label}
    </li>
  );
}
export default OptionItem;
