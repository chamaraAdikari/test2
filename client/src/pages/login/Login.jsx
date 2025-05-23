import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ 
        type: "LOGIN_SUCCESS", 
        payload: {
          ...res.data.details,
          token: res.data.token
        } 
      });
      navigate("/");
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: { message: err.response?.data?.message || "Login failed" }
      });
    }
  };

  return (
    <div className="loginPage">
      <div className="login">
        <div className="lContainer">
          <h3>Welcome Back</h3>
          
          <div className="inputGroup">
            <input
              type="text"
              placeholder="Username or Email"
              id="identifier"
              onChange={handleChange}
              className="lInput"
            />
          </div>

          <div className="inputGroup">
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
              className="lInput"
            />
          </div>

          <button 
            disabled={loading} 
            onClick={handleClick} 
            className="lButton"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <div className="error-message">{error.message}</div>}

          <div className="signup-link">
            Don't have an account?
            <Link to="/register">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
