import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const onLoginSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 0.5 });
    navigate("/admin-dashboard", { replace: true });
  };

  const onLoginFailure = (errMsg) => {
    setErrMsg(errMsg);
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      setErrMsg("");
      const apiUrl = import.meta.env.VITE_API_URL + "/admin";
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      };

      const response = await fetch(apiUrl, options);
      const data = await response.json();

      if (response.ok) {
        onLoginSuccess(data.jwt_token);
      } else {
        onLoginFailure(data.message);
      }
    } catch (err) {
      setErrMsg(err.message);
    }
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken) {
    return <Navigate to="/admin-dashboard" />;
  }

  return (
    <div className="admin-login-bg-container">
      <h1>
        Business Directory <br />
        Admin Login
      </h1>
      <form onSubmit={login}>
        <div className="label-user-input-container-admin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="label-user-input-container-admin">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="check-box-label-input-container">
          <label>Show Password</label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword((prevState) => !prevState)}
          />
        </div>
        <button type="submit">Login</button>
        {errMsg !== "" && <p className="err-msg-admin">{errMsg}</p>}
      </form>
      <div className="go-home-button-container">
        <button type="button" onClick={() => navigate("/", { replace: true })}>
          GO HOME
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
