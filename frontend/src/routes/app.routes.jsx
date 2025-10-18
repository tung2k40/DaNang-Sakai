import Layout from "../components/Layout";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/Auth/LoginPage";
import SignUpPage from "../pages/Auth/SignUpPage";
import AboutPage  from "../components/AboutPage";


export const appRoutes = [
    { path: "/home", element: <Layout><Home /></Layout> },
    { path: "/", element: <Layout><Home /></Layout> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignUpPage /> },
    { path: "/about", element: <Layout><AboutPage /></Layout>},
    
];
