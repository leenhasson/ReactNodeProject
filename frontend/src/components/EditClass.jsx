import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../API/api";
import "../styles/EditClass.css";

function EditClass() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [existingClass, setExistingClass] = useState({});
  const [updatedClass, setUpdatedClass] = useState({});
  const [error, setError] = useState("");

  // Get current Pilates class details
  useEffect(() => {
    const getClass = async () => {
    try {
          const response = await axios.get(`/api/classes/${id}`);
          setExistingClass(response.data);
      } catch (err) {
          setError(err);
        }
      };
    getClass();
  }, [navigate, id]);

  // Show their details in the website
  useEffect(() => {
    if (existingClass) {
      setUpdatedClass(existingClass);
    }
  }, [existingClass]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedClass({ ...updatedClass, [name]: value });
  };

  const handlePicture = (e) => {
    setUpdatedClass({ ...updatedClass, ["upload"]: e.target.files[0]});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.put(`/api/classes/${id}`, updatedClass, { headers: { 'Content-Type': 'multipart/form-data' }});
      navigate("/classes");
    } catch(err) {
      setError(err);
    }
  };

  if (!existingClass) {
    return <p style={{ textAlign: 'center', marginTop: '18px' }}>Class not found.</p>;
  }

  return (
    <div className="edit-container">
      <h2>Edit Class</h2>
      <h1>{error}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Class Name:</label>
          <input type="text" name="name" value={updatedClass.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Instructor:</label>
          <input type="text" name="instructor" value={updatedClass.instructor} onChange={handleChange} required />
        </div>
        <div>
          <label>Duration (in minutes):</label>
          <input type="text" name="duration" value={updatedClass.duration} onChange={handleChange} required />
        </div>
        <div>
          <label>Level:</label>
          <input type="text" name="level" value={updatedClass.level} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={updatedClass.description} onChange={handleChange} required />
        </div>
        <label>Image (Optional)</label>
        <label>Current Image</label>
          {updatedClass.image ? (
            <img src={updatedClass.image} alt="Current image" className="current-image-preview" />) : (<p>No image</p>
          )}
        <input type="file" accept="image/*" onChange={(e) => {handlePicture(e)}}/>
        <button type="submit">Save changes</button>
        <button type="button" onClick={() => navigate("/classes")}>Cancel</button>
      </form>
    </div>
  );
}

export default EditClass;
