import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const Logout = () => {
    Cookies.remove("jwt_token");
    navigate("/admin-login", { replace: true });
  };
  return (
    <div className="admin-navbar">
      <h1>Business Directory</h1>
      <ul className="admin-navbar-items">
        <li>Admin</li>
        <li>
          <button type="button" onClick={Logout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavbar;
