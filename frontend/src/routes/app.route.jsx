import Layout from "../components/Layout";
import Home from "../pages/User/Home/Home";
import LoginPage from "../pages/Auth/LoginPage";
import SignUpPage from "../pages/Auth/SignUpPage";
import AuthCallback from "../pages/Auth/AuthCallback";
import AboutPage from "../pages/AboutPage";
import ProtectedRoute from "./protected.route";
import GuestRoute from "./guest.route";
import AdminRoute from "./admin.route";
import ProfilePage from "../pages/User/Profile/ProfilePage";
import AdminDocumentReview from "../pages/Admin/AdminDocumentReview";
import NotFoundPage from "../pages/errors/NotFoundPage";

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
        path: "/auth/callback",
        element: <AuthCallback />,
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
    {
        path: "/admin/documents",
        element: (
            <AdminRoute>
                <Layout>
                    <AdminDocumentReview />
                </Layout>
            </AdminRoute>
        )
    },
    { path: "*", element: <NotFoundPage /> },
];
