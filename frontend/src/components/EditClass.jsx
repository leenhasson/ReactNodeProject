import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/EditClass.css";
function EditClass({ addClass }) {
  const navigate = useNavigate();
  const [newClass, setNewClass] = useState({ title: "", trainer: "", manufacturer: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClass({ ...newClass, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newClass.title && newClass.trainer && newClass.manufacturer) {
      addClass(newClass);
      navigate("/"); 
    }
  };

  return (
    <div className="edit-container">
      <h2>Create New Class</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Class Name:</label>
          <input type="text" name="title" value={newClass.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Trainer:</label>
          <input type="text" name="trainer" value={newClass.trainer} onChange={handleChange} required />
        </div>
        <div>
          <label>Manufacturer:</label>
          <input type="text" name="manufacturer" value={newClass.manufacturer} onChange={handleChange} required />
        </div>
        <button type="submit">Add Class</button>
      </form>
    </div>
  );
}

export default EditClass;
