import "./index.css";

const AdminNavbar = () => {
  return (
    <div className="admin-navbar">
      <h1>Business Directory</h1>
      <ul className="admin-navbar-items">
        <li>Admin</li>
        <li>
          <button type="button">Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavbar;
