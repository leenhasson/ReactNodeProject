import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import About from "./components/About"
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import LoginRegister from "./components/LoginRegister";
import Classes from "./components/Classes";
import EditClass from "./components/EditClass";
import "./styles/App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/current-user", { withCredentials: true })
      .then(({ data }) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/classes" element={<Classes user={user} />} />
        <Route path="/edit-class" element={user?.role === "admin" ? <EditClass /> : <h2>Access Denied</h2>} />
        <Route path="/login" element={<LoginRegister setUser={setUser} />} />
      </Routes>
    </>
  );
}

export default App;
