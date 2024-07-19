import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { LogginContext } from "./Linktree";

import "./css/Navbar.css";

function Navbar() {
  const context = useContext(LogginContext);
  const history = useHistory();
  const logout = () => {
    window.sessionStorage.removeItem("userdata");
    window.sessionStorage.removeItem("linktree");
    context.setLoggedIn(false);
    history.push("/");
  };
  return (
    <nav className="custom-navbar">
      <Link to="/home" className="site-logo text-decoration-underline">
        linktree
      </Link>
      <div className="nav-item-container">
        <Link to="/about" className="nav-btn text-decoration-underline">
          <span>About</span>
        </Link>
        {context.loggedIn && (
          <Link
            to="/"
            onClick={logout}
            className="nav-btn text-decoration-underline"
          >
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
