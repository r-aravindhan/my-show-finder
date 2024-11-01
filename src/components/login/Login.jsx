import React, { useState } from "react";
import users from "../../mocks/users.json";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const user = users.find(
        (user) => user.username === username && user.password === password,
      );

      if (user) {
        alert("Login successful!");
        setError("");
      } else {
        setError("Invalid credentials!");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container">
      <span>Login</span>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
  );
}

export default Login;
