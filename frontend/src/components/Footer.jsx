import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-6">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-600">
        {/* Giới thiệu */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            DaNang Scholar
          </h3>
          <p className="text-sm leading-relaxed text-justify">
            Nền tảng học tập và chia sẻ tri thức dành cho học sinh, sinh viên và
            giáo viên tại Đà Nẵng.
          </p>
          <p className="text-sm leading-relaxed text-justify mt-1">
            Cùng nhau lan tỏa tinh thần học tập suốt đời, xây dựng cộng đồng học
            tập hiện đại.
          </p>
        </div>

        {/* Liên kết nhanh */}
        <div>
          <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-3">
            Liên kết nhanh
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/about"
                className="hover:text-blue-600 transition-colors"
              >
                Về chúng tôi
              </Link>
            </li>
            <li>
              <a
                href="#contact-info"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact-info")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                Liên hệ
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  if (window.__openUploadDocumentModal) {
                    window.__openUploadDocumentModal();
                  } else {
                    window.location.href = "/login";
                  }
                }}
                className="hover:text-blue-600 transition-colors text-left bg-transparent border-0 p-0 cursor-pointer"
              >
                Đóng góp tài liệu
              </button>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-600 transition-colors"
              >
                Chính sách bảo mật
              </Link>
            </li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div id="contact-info">
          <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-3">
            Liên hệ
          </h4>
          <p className="text-sm mb-3">
            Email:{" "}
            <a
              href="mailto:thanhtung26042004@gmail.com"
              className="text-blue-600 hover:underline"
            >
              thanhtung26042004@gmail.com
            </a>
          </p>

          <div className="flex gap-5 text-lg">
            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="text-blue-600 hover:text-blue-700 transition transform hover:scale-110"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>

            {/* Zalo */}
            <a
              href="#"
              aria-label="Zalo"
              className="text-sky-500 hover:text-sky-600 transition transform hover:scale-110"
            >
              <i className="fa-solid fa-comment-dots"></i>
            </a>

            {/* Email */}
            <a
              href="mailto:thanhtung26042004@gmail.com"
              aria-label="Email"
              className="text-indigo-500 hover:text-indigo-600 transition transform hover:scale-110"
            >
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="border-t border-gray-200 mt-8 pt-4 text-center text-xs text-gray-500">
        © 2025 <span className="font-medium text-gray-700">DaNang Scholar</span>
        . Tất cả quyền được bảo lưu.
      </div>
    </footer>
  );
}
