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
import Board from "./routes/Board";
import BoardContent from "./routes/BoardContent";
import DatabaseAccess from "./routes/DatabaseAccess";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" index element={<Default />} />
        <Route path="/:education" element={<Home />} />
        <Route path="/:education/login" element={<Login />} />
        <Route path="/:education/account" element={<AccountType />} />
        <Route path="/:education/account/student" element={<Account />} />
        <Route
          path="/:education/category/:category"
          element={<DetailCategory />}
        />
        <Route
          path="/:education/category/:category/:mode"
          element={<Board />}
        />
        <Route
          path="/:education/category/:category/:mode/:boardIdx"
          element={<Board />}
        />
        <Route
          path="/:education/category/:category/detail/:board_idx"
          element={<BoardContent />}
        />

        <Route
          path="/:education/database/:accessor"
          element={<DatabaseAccess />}
        />
      </Routes>
    </Router>
  );
}

export default App;
