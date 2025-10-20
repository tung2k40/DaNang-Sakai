import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, GraduationCap } from "lucide-react";
import signupIllustration from "../../assets/images/signup.png";
import backgroundlogin from "../../assets/images/bglogin.jpg";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign up submitted:", formData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundlogin})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex flex-col md:flex-row w-[90%] md:w-[65%] lg:w-[55%] rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="md:w-1/2 w-full p-10 flex flex-col justify-center">
          <div className="text-center mb-8">
            <GraduationCap className="w-10 h-10 text-cyan-600 mx-auto mb-3" />
            <h1 className="text-3xl font-extrabold text-gray-800">
              Create Account
            </h1>
            <p className="text-gray-500 mt-1">
              Join our learning community today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="John Doe"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="youremail@domain.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-cyan-400/50 hover:shadow-cyan-400/80 mt-6"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center mt-5 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-600 hover:text-cyan-700 font-semibold"
            >
              Log in
            </Link>
          </p>
        </div>

        <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-blue-50/70 p-10 text-center">
          <img
            src={signupIllustration}
            alt="Signup Illustration"
            className="w-full max-w-xs mx-auto drop-shadow-xl"
          />
          <h3 className="mt-6 text-2xl font-bold text-cyan-700">
            Start Your Journey Today
          </h3>
          <p className="text-gray-600 mt-2 mb-4 text-sm">
            Unlock your potential with a few simple steps.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <span className="px-3 py-1 text-xs bg-cyan-200/80 text-cyan-800 font-medium rounded-full">
              Free Access
            </span>
            <span className="px-3 py-1 text-xs bg-cyan-200/80 text-cyan-800 font-medium rounded-full">
              Fast Setup
            </span>
            <span className="px-3 py-1 text-xs bg-cyan-200/80 text-cyan-800 font-medium rounded-full">
              Secure & Private
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
