import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home({ user }) {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-bg"></div>
      <div className="hero-text">
        <h1>
          <span className="highlight">Pilates Studio</span>
          <br /> for more customers & more profit.
        </h1>
        <p>
          We aren't your average Pilates studio—our expert-led sessions pack
          a serious punch, helping you strengthen, tone, and transform your
          body.
        </p>
        {user ? (
          <h2>Welcome back, {user.username}!</h2>
        ) : (
          <button className="get-started" onClick={() => navigate("/login")}>Login / Register</button>
        )}
      </div>
    </div>
  );
}

export default Home;