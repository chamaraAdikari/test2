import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faSignOutAlt, 
  faStore,
  faTimes 
} from "@fortawesome/free-solid-svg-icons";
import CurrencySelector from "../currencySelector/CurrencySelector";
import LanguageSelector from "../languageSelector/LanguageSelector";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.navUser') && !event.target.closest('.dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setIsDropdownOpen(false);
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color: "inherit", textDecoration: "none"}}>
          <span className="logo">Ceylon-Bookin</span>
        </Link>
        <div className="navEnd">
          <CurrencySelector />
          {user ? (
            <div className="navUser">
              <span 
                className="username"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                title={user.username}
              >
                {window.innerWidth <= 768 && user.username.length > 6 
                  ? `${user.username.slice(0, 6)}...` 
                  : user.username}
              </span>
              <div 
                className="profileIcon"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FontAwesomeIcon icon={faUser} />
              </div>
              
              <div className={`dropdown ${isDropdownOpen ? 'active' : ''}`}>
                <div className="dropdownClose" onClick={() => setIsDropdownOpen(false)}>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
                {window.innerWidth <= 768 && (
                  <>
                    <div className="dropdownItem currencyItem">
                      <CurrencySelector />
                    </div>
                    <div className="dropdownDivider"></div>
                  </>
                )}
                <Link to="/become-supplier" style={{ textDecoration: 'none' }}>
                  <div className="dropdownItem becomeSupplier" onClick={() => setIsDropdownOpen(false)}>
                    <FontAwesomeIcon icon={faStore} />
                    Become a Supplier
                  </div>
                </Link>
                <div className="dropdownDivider"></div>
                <div className="dropdownItem" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Logout
                </div>
              </div>
            </div>
          ) : (
            <div className="navItems">
              <Link to="/register">
                <button className="navButton">Register</button>
              </Link>
              <Link to="/login">
                <button className="navButton">Login</button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {isDropdownOpen && <div className="dropdownBackdrop" onClick={() => setIsDropdownOpen(false)}></div>}
    </div>
  );
};

export default Navbar;