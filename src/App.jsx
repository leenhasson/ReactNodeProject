import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ClassDetails from "./components/ClassDetails";
import Classes from "./components/Classes";
import EditClass from "./components/EditClass"; 
import "./App.css";

function App() {
  const [classes, setClasses] = useState([]);

  const handleAddClass = (newClass) => {
    setClasses((prevClasses) => [
      ...prevClasses,
      {
        id: prevClasses.length + 1,
        ...newClass,
      },
    ]);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/edit-class" element={<EditClass addClass={handleAddClass} />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/classes" element={<Classes classes={classes} />} />
        <Route path="/class/:id" element={<ClassDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
