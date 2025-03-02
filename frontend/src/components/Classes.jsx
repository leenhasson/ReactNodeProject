import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../API/api";
import "../styles/Classes.css";

function Classes({ user }) {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Fetching classes from frontend...");
    axios.get("/api/classes", { withCredentials: true })
      .then((response) => {
        console.log("Classes data received:", response.data);
        setClasses(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching classes:", err);
        setError("Can not show classes. Are you sure you are logged in?");
        setLoading(false);
      });
  }, []);

  const handleClick = (id) => {
    navigate(`/classes/${id}`);
  };

  return (
    <div className="classes-container">
      <h1>Pilates Classes</h1>
      {loading ? (
        <h2>Loading classes...</h2>
      ) : error ? (
        <h2 style={{ color: "red" }}>{error}</h2>
      ) : (
        <>
        {user && user.user_role === "admin" && (
          <button onClick={() => navigate("/new-class")} className="create-class-button">
            Create New Class
            </button>
          )}
          <div className="class-list">
          
          {classes.length === 0 ? <p>No classes available.</p> : classes.map((cls) => (
            <div className="class-card" key={cls.id} onClick={() => handleClick(cls.id)}>
              <h3>{cls.name}</h3>
              <p><img className ="class-image" src={`http://localhost:3000${cls.image}`}/></p>
              <p><strong>Instructor:</strong> {cls.instructor}</p>
              <p><strong>Level:</strong> {cls.level}</p>
              <p><strong>Duration:</strong> {cls.duration}</p>
              <p>{cls.description}</p>
            </div>
          ))}
        </div>
        </>
      )}
    </div>
  );
}

export default Classes;