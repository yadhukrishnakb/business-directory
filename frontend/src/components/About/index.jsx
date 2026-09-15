import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

import "./index.css";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="about-section-bg-container">
      <Navbar />
      <div className="about-section-content-container">
        <h1>About Business Directory</h1>
        <p> Find and discover local businesses and services in your area.</p>
        <div className="about-description">
          What is Business Directory? Business Directory is a simple platform
          that helps users discover local businesses and service providers. Find
          plumbers, electricians, tutors, mechanics, and other local services in
          one place.
        </div>
        <button type="button" onClick={() => navigate("/")}>
          Explore Businesses
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default About;
