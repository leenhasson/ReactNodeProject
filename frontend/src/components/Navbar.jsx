
import { Link, useNavigate } from "react-router-dom";
import "./../styles/App.css";

function Navbar({user, setUser}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  }

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/classes">Classes</Link>
      <Link to="/contact">Contact</Link>
      <div className="navbar-user">
        {user ? (
          <>
            <span>Welcome, {user.username} ({user.user_role}) </span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="navbar-link">Sign In</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
