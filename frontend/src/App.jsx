import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import SignUpPage from "./pages/Auth/SignUpPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
    
  );
}

export default App;
