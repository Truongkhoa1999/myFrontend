import React from 'react';
import'./style/NotFound.scss'

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">Page not found</p>
      <img src='https://miro.medium.com/v2/resize:fit:720/format:webp/1*oTOmPQFJQSOHrYHWnxytgA.png'></img>
    </div>
  );
};

export default NotFound;
