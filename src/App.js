import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login/Login";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
          <span>My Show Finder</span>
        </div>
        <br />
        <div>Book it, love it, relive it!</div>
      </header>
      <br />
      <Login />
    </div>
  );
}

export default App;
