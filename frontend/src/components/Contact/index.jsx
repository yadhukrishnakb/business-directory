import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

import "./index.css";
import { use } from "react";

const Contact = () => {
  const navigate = useNavigate();
  return (
    <div className="contact-section-bg-container">
      <Navbar />
      <div className="contact-section-content-container">
        <h1>Get in Touch</h1>
        <p>Want to add your business to our local directory?</p>
        <div className="contact-section-description">
          <p>
            Want your business to be listed in our directory? Send us your
            business details through email or contact us by phone, and we'll
            review your request.
            <span>
              Email: businessdirectory.listing@gmail.com <br /> Phone: +91 00000
              00000
            </span>
          </p>
        </div>
        <button type="button" onClick={() => navigate("/")}>
          Explore Businesses
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
