import React from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/personalize");
  };

  return (
    <div className="welcome-container">
      <div className="overlay">
        <h1 className="app-title">ReadX</h1>
        <h2 className="headline fade-in">
          Save money. Read smarter. <br />
          <strong>Rent books at low cost</strong> and enjoy reading <br />
          without paying full price.
        </h2>
        <button className="start-button fade-in" onClick={handleStart}>
          Start Reading
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
