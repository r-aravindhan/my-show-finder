import React, { useContext, useState } from "react";
import users from "../mocks/users.json";
import "../styles/LoginPage.css";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import { UserContext } from "../context/UserContext";

function LoginPage() {
  const { setUsername } = useContext(UserContext);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const user = users.find(
        (user) => user.emailId === emailId && user.password === password,
      );

      if (user) {
        setUsername(user.name);
        navigate("/my-show-finder/movies");
        setError("");
      } else {
        setError("Invalid credentials!");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <header className="App-header">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
          <span>My Show Finder</span>
        </div>
        <br />
        <div>Book it, love it, relive it!</div>
      </header>
      <br />
      <div className="container">
        <input
          type="email"
          placeholder="Email Id"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <button onClick={handleLogin} className="button" disabled={loading}>
          {loading ? (
            <span>
              Verifying <span className="loader"></span>
            </span>
          ) : (
            "Continue"
          )}
        </button>
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
}

export default LoginPage;
