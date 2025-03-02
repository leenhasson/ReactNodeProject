import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../API/api";
import "../styles/NewClass.css";

function NewClass() {
  const navigate = useNavigate();
  const [newClass, setNewClass] = useState({ name: "", instructor: "", duration: "", level: "", description: "", "image": null});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClass({ ...newClass, [name]: value });
  };

  const handlePicture = (e) => {
    setNewClass({ ...newClass, ["upload"]: e.target.files[0]});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post('/api/classes/', newClass, { headers: { 'Content-Type': 'multipart/form-data' }});
      navigate("/");
    } catch(err) {
      setError(err);
    }
  };

  return (
    <div className="edit-container">
      <h2>Create New Class</h2>
      <h1>{error}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Class Name:</label>
          <input type="text" name="name" value={newClass.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Instructor:</label>
          <input type="text" name="instructor" value={newClass.instructor} onChange={handleChange} required />
        </div>
        <div>
          <label>Duration (in minutes):</label>
          <input type="text" name="duration" value={newClass.duration} onChange={handleChange} required />
        </div>
        <div>
          <label>Level:</label>
          <input type="text" name="level" value={newClass.level} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={newClass.description} onChange={handleChange} required />
        </div>
        <label>Image (Optional)</label>
            <input type="file" accept="image/*" onChange={(e) => {handlePicture(e)}}/>
        <button type="submit">Add Class</button>
      </form>
    </div>
  );
}

export default NewClass;
