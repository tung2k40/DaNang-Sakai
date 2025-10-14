export default function Header() {
    return (
        <header className="bg-white] shadow px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">My App</h1>
            <nav>
                <ul className="flex gap-6 text-gray-700">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </nav>
        </header>
    );
}
