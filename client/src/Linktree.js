import { Redirect, Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Navbar from "./Navbar";
import AuthForm from "./AuthForm";
import Home from "./Home";

export const LogginContext = React.createContext();
function Linktree() {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        if (window.localStorage.getItem("userdata")) setLoggedIn(true);
    }, [loggedIn]);
    return (
        <React.Fragment>
            <LogginContext.Provider value={{ loggedIn, setLoggedIn }}>
                <Navbar />
                <Route
                    path="/"
                    exact
                    render={() =>
                        !loggedIn ? <AuthForm /> : <Redirect to={"/home"} />
                    }
                />
                <Route
                    path="/home"
                    exact
                    render={() => (loggedIn ? <Home /> : <Redirect to={"/"} />)}
                />
            </LogginContext.Provider>
        </React.Fragment>
    );
}

export default Linktree;
