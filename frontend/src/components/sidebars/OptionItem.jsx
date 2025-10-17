function OptionItem({ icon, label, color, onClick }) {
  return (
    <li>
      <button
        onClick={onClick}
        className="flex items-center gap-2 text-sm text-gray-700 hover:text-cyan-600 transition"
      >
        <i className={`${icon} ${color}`}></i>
        {label}
      </button>
    </li>
  );
}

export default OptionItem;
