import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Admin from "./pages/Admin";
import User from "./pages/User";
import SSOLogin from "./pages/SSOLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sso" element={<SSOLogin />} />
        <Route path="admin/*" element={<Admin />} />
        <Route path="user/*" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
