import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "../API/api";
import "../styles/LoginRegister.css";

function LoginRegister({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: null , email: null , password: null });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.username.length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }

    if (formData.password.length < 3 || formData.password.length > 8) {
      setError("Password must be between 3 and 8 characters long.");
      return;
    }

    // Validate password contains at least 1 letter and 1 digit
    if (!/(?=.*[A-Za-z])/.test(formData.password) || !/(?=.*\d)/.test(formData.password)) {
      setError("Password must include at least one letter and one digit.");
      return;
    }

    try {
      const url = `/api/users/${isLogin ? "login" : "register"}`;
      const { data } = await axios.post(url, formData, { withCredentials: true });
      setUser(data.user);
      navigate("/classes");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="login-register-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="login-register-form">
        {!isLogin && (
                  <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      
        )}
         <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit" className="login-register-button">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)} className="toggle">
        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
      </p>
    </div>
  );
}

export default LoginRegister;
