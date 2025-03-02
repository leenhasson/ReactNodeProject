import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../API/api";
import "../styles/ClassDetails.css";

function ClassDetails({user}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [classDetail, setClassDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/classes/${id}`)
      .then((response) => {
        setClassDetail({
          id: response.data.id,
          name: response.data.name,
          level: response.data.level,
          description: response.data.description,
          instructor: response.data.instructor,
          duration: `${response.data.duration} minutes`,
          image: response.data.image
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load class details. Are you sure you are logged in?");
        setLoading(false);
      });
  }, [id]);

  const handleEditClass = () => {
    navigate(`/edit-class/${id}`);
  }

  const handleDeleteClass = () => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        axios.delete(`/api/classes/${id}`);
        navigate("/classes");
      } catch (err) {
        setError(err);
      }
    }
  }

  return (
    <div className="class-details-container">
      {loading ? (
        <h2>Loading class details...</h2>
      ) : error ? (
        <h2 style={{ color: "red" }}>{error}</h2>
      ) : (
        <>
          <h1>{classDetail.name}</h1>
          <img src={classDetail.image} alt={classDetail.title} className="class-image-details"/>
          <p><strong>Level:</strong> {classDetail.level}</p>
          <p><strong>Instructor:</strong> {classDetail.instructor}</p>
          <p><strong>Duration:</strong> {classDetail.duration}</p>
          <p><strong>Description:</strong> {classDetail.description}</p>
        </>
      )}
      {user && user.user_role === 'admin' && (
        <button className="edit-class-button" onClick={handleEditClass}>
          Edit Class
        </button>
      )}
      {user && user.user_role === 'admin' && (
        <button className="delete-class-button" onClick={handleDeleteClass}>
          Delete Class
        </button>
      )}
    </div>
  );
}

export default ClassDetails;