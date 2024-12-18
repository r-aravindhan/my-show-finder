import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaUserCircle } from "react-icons/fa";
import "../styles/Navbar.css";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const { username } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav data-testid="navbar" className="navbar">
      <div
        className="menu-icon"
        role="button"
        aria-label="menu"
        onClick={toggleMenu}
      >
        <FaBars size={24} />
        {menuOpen && (
          <div className="menu-dropdown">
            <Link to="/my-show-finder/movies">Movies</Link>
            <Link to="/my-show-finder/bookings">Bookings</Link>
          </div>
        )}
      </div>

      <div>My Show Finder</div>

      <div className="profile-section">
        <span>Welcome {username}</span>
        <FaUserCircle
          size={24}
          className="profile-icon"
          role="button"
          aria-label="profile"
          onClick={toggleProfile}
        />
        {profileOpen && (
          <div className="profile-dropdown">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
