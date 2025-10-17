import Layout from "../components/Layout";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/Auth/LoginPage";
import SignUpPage from "../pages/Auth/SignUpPage";

export const appRoutes = [
    { path: "/", element: <Layout><Home /></Layout> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignUpPage /> },
];
