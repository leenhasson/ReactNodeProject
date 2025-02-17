import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ClassDetails.css";

function ClassDetails() {
  const { id } = useParams();
  const [classDetail, setClassDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        setClassDetail({
          id: response.data.id,
          name: response.data.name,
          level: "Beginner",
          description: "A great Pilates class for beginners.",
          instructor: response.data.username,
          duration: "60 minutes"
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load class details.");
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="class-details-container">
      {loading ? (
        <h2>Loading class details...</h2>
      ) : error ? (
        <h2 style={{ color: "red" }}>{error}</h2>
      ) : (
        <>
          <h1>{classDetail.name}</h1>
          <p><strong>Level:</strong> {classDetail.level}</p>
          <p><strong>Instructor:</strong> {classDetail.instructor}</p>
          <p><strong>Duration:</strong> {classDetail.duration}</p>
          <p><strong>Description:</strong> {classDetail.description}</p>
        </>
      )}
    </div>
  );
}

export default ClassDetails;