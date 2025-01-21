import React from 'react';
import { Link } from 'react-router-dom';


function Details({ type }) {
  const detailsMap = {
    equipment: 'פרטים על ציוד כושר',
    nutrition: 'פרטים על תוכניות תזונה',
    trainers: 'פרטים על מאמנים אישיים'
  };

  return (
    <div>
      <h1>{detailsMap[type]}</h1>
      <p>מידע נוסף יגיע בקרוב...</p>
    </div>
  );
}

export default Details;
