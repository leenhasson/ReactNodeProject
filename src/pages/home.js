

import React from 'react';

function Home() {
  return (
    <div>
      <h1>ברוכים הבאים למכון הכושר שלנו</h1>
      <p>
        אצלנו תמצאו את הציוד המתקדם ביותר, מאמנים מקצועיים ותוכניות אימון מותאמות אישית. 
        התחילו את המסע שלכם לבריאות וכושר עוד היום!
      </p>
     
      <button 
        style={{
          backgroundColor: '#ffa500',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        הצטרפו עכשיו
      </button>
    </div>
  );
}

export default Home;
