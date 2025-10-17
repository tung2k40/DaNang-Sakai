import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';

export default function Header() {
    return (
        <header className="bg-white] shadow px-6 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center">
                <img className="w-10 h-10 mr-2" src={logo} alt="Logo" />
                <h1 className="text-xl font-bold text-blue-600">DaNang Scholar</h1>
            </Link>
            <nav>
                <ul className="flex gap-6 text-gray-700">
                    <li><a href="/">Trang chủ</a></li>
                    <li><a href="/about">Về chúng tôi</a></li>
                </ul>
            </nav>
        </header>
    );
}
