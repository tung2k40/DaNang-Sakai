import Layout from "../components/Layout";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/Auth/LoginPage";
import SignUpPage from "../pages/Auth/SignUpPage";
import AboutPage from "../components/AboutPage";
import ProtectedRoute from "./ProtectedRoute"; // cứ để đó, sau có page cần login thì thêm vào
import GuestRoute from "./GuestRoute";

export const appRoutes = [
    { path: "/home", element: <Layout><Home /></Layout> },
    { path: "/", element: <Layout><Home /></Layout> },
    {
        path: "/login",
        element: (
            <GuestRoute>
                <LoginPage />
            </GuestRoute>
        ),
    },
    {
        path: "/signup",
        element: (
            <GuestRoute>
                <SignUpPage />
            </GuestRoute>
        ),
    },
    { path: "/about", element: <Layout><AboutPage /></Layout> },

];
