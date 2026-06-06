import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function GuestRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <div>Đang kiểm tra đăng nhập...</div>;

    if (user) {
        return <Navigate to="/home" replace />;
    }

    return children;
}
