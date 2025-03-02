import { FaInstagram } from "react-icons/fa";

import "../styles/About.css";

function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About <span className="highlight">Pilates Studio</span></h1>
      <p className="about-text">
        Welcome to <b>Pilates Studio</b>, a space designed to help you strengthen, stretch, and
        transform your body. Our expert-led sessions focus on balance, flexibility, and
        strength-building to bring you a holistic fitness experience.
      </p>

      <p className="about-text">
        Whether you're a beginner or a seasoned Pilates enthusiast, our studio offers personalized
        classes tailored to your fitness level. Join us and discover a community that values
        well-being, self-care, and progress.
      </p>

      <div className="about-footer">
        <p>Follow us on Instagram for updates & inspiration!</p>
        <a href="https://www.instagram.com/yourpage" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="instagram-icon" />
        </a>
      </div>
    </div>
  );
}

export default About;
