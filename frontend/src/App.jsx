// Leen Hasson - 212480438
// Adan Kayouf - 212743280

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "./API/api";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Classes from "./components/Classes";
import ClassDetails from "./components/ClassDetails";
import NewClass from "./components/NewClass";
import EditClass from "./components/EditClass";
import LoginRegister from "./components/LoginRegister";
import Footer from "./components/Footer";
import "./styles/App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/api/users/current", { withCredentials: true })
      .then(({ data }) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/about" element={<About user={user} />} />
        <Route path="/contact" element={<Contact user={user} />} />
        <Route path="/classes" element={<Classes user={user} />} />
        <Route path="/classes/:id" element={<ClassDetails user={user} />} />
        <Route path="/new-class" element={user?.user_role === "admin" ? <NewClass/> : <h2>Access Denied</h2>} />
        <Route path="/edit-class/:id" element={user?.user_role === "admin" ? <EditClass/> : <h2>Access Denied</h2>} />
        <Route path="/login" element={<LoginRegister setUser={setUser} />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
