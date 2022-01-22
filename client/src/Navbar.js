import "./css/Navbar.css";

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { LogginContext } from "./Linktree";

function Navbar() {
    const context = useContext(LogginContext);
    const history = useHistory();
    const logout = () => {
        window.localStorage.removeItem("userdata");
        window.localStorage.removeItem("linktree");
        context.setLoggedIn(false);
        history.push("/");
    };
    return (
        <nav className="navbar">
            <header className="brand-name">Linktree</header>
            <ul className="nav-item-container">
                {!context.loggedIn ? (
                    <li className="nav-item">
                        <Link to="/">Login/Signup</Link>
                    </li>
                ) : (
                    <li className="nav-item">
                        <Link to="/" onClick={logout}>
                            Logout
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
