
import { Link } from "react-router-dom";
import "./../styles/App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/classes">Classes</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}

export default Navbar;
