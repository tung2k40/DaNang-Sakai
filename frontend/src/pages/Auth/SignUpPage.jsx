import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Lock, Mail, User, Loader } from "lucide-react";
import signup from "../../assets/images/signup.png";

// ⚡ Giả lập BorderAnimatedContainer nếu bạn chưa tạo
function BorderAnimatedContainer({ children }) {
  return (
    <div className="relative border border-slate-700 rounded-2xl overflow-hidden shadow-lg shadow-slate-800/40">
      {children}
    </div>
  );
}

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isSigningUp] = useState(false); // 🔹 tạm giả lập loading

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData); // chỉ test UI
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900 min-h-screen">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* LEFT FORM COLUMN */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* HEADER */}
                <div className="text-center mb-8">
                  <MessageCircle className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Create Account
                  </h2>
                  <p className="text-slate-400">Sign up for a new account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* FULL NAME */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            fullName: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="johndoe@gmail.com"
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={isSigningUp}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg transition-all"
                  >
                    {isSigningUp ? (
                      <Loader className="w-5 h-5 mx-auto animate-spin" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                {/* LINK TO LOGIN */}
                <div className="mt-6 text-center">
                  <Link
                    to="/login"
                    className="text-cyan-400 hover:underline text-sm"
                  >
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/30 to-transparent">
              <div>
                <img
                  src={signup}
                  alt="Signup illustration"
                  className="w-full h-auto object-contain rounded-lg"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">
                    Start Your Journey Today
                  </h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="px-3 py-1 text-xs bg-cyan-600/20 text-cyan-400 rounded-full">
                      Free
                    </span>
                    <span className="px-3 py-1 text-xs bg-cyan-600/20 text-cyan-400 rounded-full">
                      Easy Setup
                    </span>
                    <span className="px-3 py-1 text-xs bg-cyan-600/20 text-cyan-400 rounded-full">
                      Private
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default SignUpPage;
