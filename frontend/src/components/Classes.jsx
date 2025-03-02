import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Classes.css";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";

const classImages = [img1, img2, img3, img4, img5, img6, img7];


function Classes({ user }) {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError("Failed to load classes.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="classes-container">
      <h1>Pilates Classes</h1>
      {loading ? (
        <h2>Loading classes...</h2>
      ) : error ? (
        <h2 style={{ color: "red" }}>{error}</h2>
      ) : (
        <div className="class-list">
          {classes.length === 0 ? <p>No classes available.</p> : classes.map((cls) => (
            <div className="class-card" key={cls.id}>
              <h3>{cls.name}</h3>
              <p><strong>Instructor:</strong> {cls.instructor}</p>
              <p><strong>Level:</strong> {cls.level}</p>
              <p><strong>Duration:</strong> {cls.duration}</p>
              <p>{cls.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Classes;