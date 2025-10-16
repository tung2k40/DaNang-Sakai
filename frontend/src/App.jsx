import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home/Home.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
    </Routes>
  );
}

export default App;
