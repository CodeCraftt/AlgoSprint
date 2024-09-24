// Loader.jsx
import React from "react";
import "./Loader.css"; // Import the CSS file for loader styles

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
