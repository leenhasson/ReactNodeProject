import { useState } from "react";
import axios from "axios";
import "../styles/LoginRegister.css";

function LoginRegister({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: null , email: null , password: null });
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");



    try {
      const url = `http://localhost:5000/api/users/${isLogin ? "login" : "register"}`;
      const { data } = await axios.post(url, formData, { withCredentials: true });
      setUser(data.user);
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
