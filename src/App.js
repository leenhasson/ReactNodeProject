
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Details from './pages/details';
import './App.css';

function App() {
  return (
    <Router>
      <div>
      
        <nav>
          <ul>
            <li>
              <Link to="/">בית</Link>
            </li>
            <li>
              <Link to="/about">אודות</Link>
            </li>
            <li>
              <Link to="/contact">צור קשר</Link>
            </li>
            <li>
              <Link to="/details">פרטים</Link>
            </li>
          </ul>
        </nav>


        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/details" element={<Details />} />
          </Routes>
        </main>

 
        <footer>
          <p>&copy; 2025 כל הזכויות שמורות למכון הכושר שלנו.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
