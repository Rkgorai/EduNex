import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-container">
      <h2>Welcome to Edunex!</h2>
      <p>
        Your platform for finding the best courses across multiple databases.
      </p>
      <Link to="/courses" className="btn">
        Explore Courses
      </Link>
    </div>
  );
};

export default HomePage;
