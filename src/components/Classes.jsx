import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Classes.css";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";

const classImages = [img1, img2, img3, img4, img5, img6, img7];

function Classes() {
  const [classes, setClasses] = useState([]); // Using local state to manage classes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setClasses(response.data.slice(0, 7).map((user, index) => ({  
          id: index + 1,  
          title: user.name,
          trainer: user.username,
          manufacturer: "Unknown",
          level: "Intermediate",
          duration: "60 minutes",
          description: "A fantastic Pilates session to improve flexibility and strength.",
          image: classImages[index] || img1
        })));
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load classes.");
        setLoading(false);
      });
  }, []); // Only run on mount

  const handleViewDetails = (cls) => {
    navigate(`/class/${cls.id}`, { state: { post: cls } });
  };

  return (
    <div className="page-container">
      <div className="content-box">
        <h1 className="page-title">Pilates Classes</h1>
        <p className="page-description">Explore our expertly designed Pilates classes to suit all levels and goals.</p>
        
        <button onClick={() => navigate("/edit-class")} className="create-class-button">
          Create New Class
        </button>

        <div className="class-list">
          {loading ? (
            <h2>Loading classes...</h2>
          ) : error ? (
            <h2 style={{ color: "red" }}>{error}</h2>
          ) : classes.length > 0 ? (
            classes.map((cls) => (
              <div className="class-card" key={cls.id}>
                <img src={cls.image} alt={cls.title} className="class-image" />
                <h3 className="class-title">{cls.title}</h3>
                <p><strong>Trainer:</strong> {cls.trainer}</p>
                <p><strong>Manufacturer:</strong> {cls.manufacturer}</p>
                <p><strong>Duration:</strong> {cls.duration}</p>
                <p>{cls.description}</p>
                <button onClick={() => handleViewDetails(cls)} className="view-details">View Details</button>
              </div>
            ))
          ) : (
            <h2>No classes available. Add one!</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default Classes;
