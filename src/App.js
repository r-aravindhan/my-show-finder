import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import store from "./redux/store";
import { UserProvider } from "./context/UserContext";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/my-show-finder" element={<Layout />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </UserProvider>
    </div>
  );
}

export default App;
