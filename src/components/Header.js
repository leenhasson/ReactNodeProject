import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav>
      <ul>
        <li><Link to="/">דף הבית</Link></li>
        <li><Link to="/about">אודות</Link></li>
        <li><Link to="/contact">צור קשר</Link></li>
      </ul>
    </nav>
  );
}

export default Header;
