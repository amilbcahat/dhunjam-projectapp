import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Login from "./pages/login";
import Home from "./pages/home";

import axios from "axios";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
function App() {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <>
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Home user={user} />} />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
