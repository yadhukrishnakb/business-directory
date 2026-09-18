import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";

import "./index.css";

const apiStatusConstants = {
  success: "SUCCESS",
  inProgress: "IN_PROGRESS",
  failure: "FAILURE",
  initial: "INITIAL",
};

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

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

  const renderButtonText = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return "Redirecting...";
      case apiStatusConstants.inProgress:
        return (
          <ThreeDots
            visible={true}
            height="20"
            width="35"
            color="#ffffff"
            radius="8"
            ariaLabel="login-loading"
          />
        );
      case apiStatusConstants.failure:
        return "Login";
      default:
        return "Login";
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
            id="password"
            type={showPassword ? "text" : "password"}
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="check-box-label-input-container">
          <label htmlFor="show-password">Show Password</label>
          <input
            id="show-password"
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword((prevState) => !prevState)}
          />
        </div>
        <button
          type="submit"
          disabled={apiStatus === apiStatusConstants.inProgress ? true : false}
        >
          {renderButtonText()}
        </button>
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
