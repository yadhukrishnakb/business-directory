import { useNavigate } from "react-router-dom";
// import Navbar from "../Navbar";

import "./index.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-bg-container">
      <div className="not-found-content-container">
        <img
          src="https://res.cloudinary.com/dvzcnvazm/image/upload/v1789485542/undraw_page-not-found_6wni_ku5ybs.svg"
          alt="page not found"
        />
        <p>Page Not Found!</p>
        <button type="button" onClick={() => navigate("/")}>
          Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
