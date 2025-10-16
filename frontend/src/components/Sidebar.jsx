export default function Sidebar() {
    return (
        <aside className="w-64 bg-gray-200 h-screen p-4 border-r border-gray-200">
            <ul className="space-y-3">
                <li><a href="/" className="block py-2 px-3 hover:bg-gray-200 rounded">Dashboard</a></li>
                <li><a href="/" className="block py-2 px-3 hover:bg-gray-200 rounded">Users</a></li>
                <li><a href="/" className="block py-2 px-3 hover:bg-gray-200 rounded">Settings</a></li>
            </ul>
        </aside>
    );
}
