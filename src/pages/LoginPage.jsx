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

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");

    const form = event.target;
    const emailInput = form.elements[0];
    const passwordInput = form.elements[1];

    if (!emailInput.validity.valid) {
      if (emailInput.validity.valueMissing) {
        setError("Email is required!");
      } else if (emailInput.validity.typeMismatch) {
        setError("Please enter a valid email address!");
      }
      return;
    }

    if (!passwordInput.validity.valid && passwordInput.validity.valueMissing) {
      setError("Password is required!");
      return;
    }

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
        <form onSubmit={handleLogin} noValidate>
          <input
            type="email"
            placeholder="Email Id"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            minLength={6}
            required
          />
          <button type="submit" className="button" disabled={loading}>
            {loading ? (
              <span>
                Verifying <span className="loader"></span>
              </span>
            ) : (
              "Continue"
            )}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
}

export default LoginPage;
