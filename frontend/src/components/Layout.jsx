import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <main className="flex-1 p-6 bg-gray-100">{children}</main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
