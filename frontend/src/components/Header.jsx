import logo from "../assets/images/logo.jpg";
export default function Header() {

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="flex items-center">
      <a href="/" className="flex items-center hover:opacity-80 transition">
        <img
          className="w-10 h-10 mr-2 rounded-full"
          src={logo}
          alt="Logo"
        />
        <h1 className="text-xl font-bold text-blue-600">DaNang Scholar</h1>
      </a>
    </div>

      <nav>
        <ul className="flex gap-6 text-gray-700">
          <li>
            <a
              href="/"
              className="hover:text-blue-600 font-medium transition-colors"
            >
              Trang chủ
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="hover:text-blue-600 font-medium transition-colors"
            >
              Về chúng tôi
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
