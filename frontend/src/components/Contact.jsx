import React, { useState } from "react";
import axios from "axios";
import "../styles/Contact.css"; 

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus({ type: "error", message: "All fields are required!" });
      return;
    }
    try {
      const response = await axios.post("https://api.example.com/contact", {
        name,
        email,
        message,
      });
      if (response.status === 200) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      setStatus({ type: "error", message: "Failed to send message. Try again later." });
    }
  };

  return (
    <div className="contact-container">
    <h1>Contact Us</h1>
    <form onSubmit={handleSubmit} className="contact-form">
      <input 
        type="text" 
        placeholder="Full Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="Your Message" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        required 
      />
      <button type="submit">Send</button>
    </form>
  </div>
);
}

export default Contact;
