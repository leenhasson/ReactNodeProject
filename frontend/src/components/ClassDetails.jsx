import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ClassDetails.css";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";

const classImages = [img1, img2, img3, img4, img5, img6, img7];

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
          duration: "60 minutes",
          image: classImages[response.data.id - 1]
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
          <img src={classDetail.image} alt={classDetail.title} className="class-image-details"/>
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