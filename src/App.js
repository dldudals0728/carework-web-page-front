import "./App.css";
import Login from "./routes/Login";
import Account from "./routes/Account";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import DetailCategory from "./routes/DetailCategory";
import AccountType from "./routes/AccountType";
import Default from "./routes/Default";
import EducationContext from "./components/EducationContext";
import { useState } from "react";
function App() {
  const [pageState, setPageState] = useState({
    page: undefined,
    isLogin: false,
    userName: "",
    classNumber: "",
    classTime: "",
  });
  return (
    <EducationContext.Provider value={{ pageState, setPageState }}>
      <Router>
        <Routes>
          <Route path="/" element={<Default />} />
          <Route index path="/:education" element={<Home />} />
          <Route path="/:education/login" element={<Login />} />
          <Route path="/:education/account" element={<AccountType />} />
          <Route path="/:education/account/student" element={<Account />} />
          <Route
            path="/:education/category/:category"
            element={<DetailCategory />}
          />
        </Routes>
      </Router>
    </EducationContext.Provider>
  );
}

export default App;
