import { Link } from 'react-router-dom';
export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 py-5">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 md:flex-row md:justify-between md:items-start gap-8 text-gray-600">

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">DaNang Scholar</h3>
                    <p className="text-sm leading-relaxed text-justify">
                        Nền tảng học tập và chia sẻ tri thức dành cho học sinh, sinh viên và giáo viên tại Đà Nẵng.
                    </p>
                    <p className="text-sm leading-relaxed text-justify">
                        Cùng nhau lan tỏa tinh thần học tập suốt đời, xây dựng cộng đồng học tập hiện đại.
                    </p>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-3">
                        Liên kết nhanh
                    </h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:text-blue-600 transition-colors">Về chúng tôi</a></li>
                        <li><a href="/" className="hover:text-blue-600 transition-colors">Liên hệ</a></li>
                        <li><a href="/" className="hover:text-blue-600 transition-colors">Đóng góp tài liệu</a></li>
                        <li><a href="/" className="hover:text-blue-600 transition-colors">Chính sách bảo mật</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-3">
                        Liên hệ
                    </h4>
                    <p className="text-sm mb-3">
                        Email: <a href="mailto:sgddt@danang.gov.vn" className="text-blue-600 hover:underline">
                            sgddt@danang.gov.vn
                        </a>
                    </p>
                    <div className="flex gap-4 text-gray-400 text-lg">
                        <a href="#" aria-label="Facebook" className="hover:text-blue-600 transition-colors">
                            <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="#" aria-label="Zalo" className="hover:text-blue-600 transition-colors">
                            <i className="fa-solid fa-comment-dots"></i>
                        </a>
                        <a href="#" aria-label="Email" className="hover:text-blue-600 transition-colors">
                            <i className="fa-solid fa-envelope"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 mt-10 pt-4 text-center text-xs text-gray-400">
                © 2025 <span className="font-medium text-gray-600">DaNang Scholar</span>. Tất cả quyền được bảo lưu.
            </div>
        </footer>
    );
}
