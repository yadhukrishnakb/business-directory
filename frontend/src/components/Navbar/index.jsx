import { Link } from "react-router-dom";
import "./index.css";

const Navbar = () => (
  <div className="navbar">
    <div className="navbar-content">
      <h1 className="logo">
        <Link to="/">Business Directory</Link>
      </h1>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/admin-login">Admin</Link>
      </nav>
    </div>
  </div>
);

export default Navbar;
