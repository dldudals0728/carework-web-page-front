import "./App.css";
import Login from "./routes/Login";
import Account from "./routes/Account";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import DetailCategory from "./routes/DetailCategory";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/category/:category" element={<DetailCategory />} />
      </Routes>
    </Router>
  );
}

export default App;
