import Layout from "../components/Layout";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/Auth/LoginPage";
import SignUpPage from "../pages/Auth/SignUpPage";
import AboutPage from "../components/AboutPage";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import ProfilePage from "../pages/Profile/ProfilePage";

export const appRoutes = [
    { path: "/home", element: <Layout><Home /></Layout> },
    { path: "/", element: <Layout><Home /></Layout> },
    {
        path: "/profile",
        element: (
            <ProtectedRoute>
                <Layout>
                    <ProfilePage />
                </Layout>
            </ProtectedRoute>
        )
    },
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
