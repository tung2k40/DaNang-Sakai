import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import { loginWithSSOAPI } from "../../api/authAPI";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { fetchUser } = useAuth();
  const processed = useRef(false);

  useEffect(() => {
    const handleSSOCallback = async () => {
      if (processed.current) return;
      processed.current = true;

      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (session) {
          // Gửi access_token của Supabase lên backend
          await loginWithSSOAPI({ 
            access_token: session.access_token 
          });
          
          await fetchUser();
          toast.success("Đăng nhập thành công!");
          navigate("/home");
        } else {
          // Bắt sự kiện hash thay đổi nếu session chưa có ngay lập tức
          const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, currentSession) => {
              if (event === 'SIGNED_IN' && currentSession) {
                try {
                  await loginWithSSOAPI({ 
                    access_token: currentSession.access_token 
                  });
                  await fetchUser();
                  toast.success("Đăng nhập thành công!");
                  navigate("/home");
                } catch (err) {
                  toast.error(err?.message || "Đăng nhập SSO thất bại từ hệ thống");
                  navigate("/login");
                } finally {
                  authListener.subscription.unsubscribe();
                }
              }
            }
          );
        }
      } catch (err) {
        toast.error("Lỗi xác thực SSO: " + err.message);
        navigate("/login");
      }
    };

    handleSSOCallback();
  }, [navigate, fetchUser]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <h2 className="text-xl font-semibold text-gray-700">Đang xác thực đăng nhập...</h2>
      <p className="text-gray-500 mt-2">Vui lòng chờ trong giây lát.</p>
    </div>
  );
}
