import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import store from "./redux/store";
import { UserProvider } from "./context/UserContext";
import Layout from "./components/Layout";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MovieListingPage from "./pages/MovieListingPage";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/my-show-finder/*" element={<Layout />}>
                <Route path="movies" element={<MovieListingPage />} />
                <Route path="movies/:movieId" element={<MovieDetailsPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </UserProvider>
    </div>
  );
}

export default App;
