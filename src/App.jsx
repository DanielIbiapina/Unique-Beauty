import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPage from "./pages/admin";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
