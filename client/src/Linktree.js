import { Redirect, Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Navbar from "./Navbar";
import AuthForm from "./AuthForm";
import Home from "./Home";
import Profile from "./Profile";
import PageNotFound from "./PageNotFound";
import About from "./About";

export const LogginContext = React.createContext();
function Linktree() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (window.sessionStorage.getItem("userdata")) setLoggedIn(true);
  }, [loggedIn]);
  // Route for publishing for the linktree
  return (
    <LogginContext.Provider value={{ loggedIn, setLoggedIn }}>
      <div className="app-container">
        <Navbar />
        <br />
        <Switch>
          <Route path="/about" exact render={() => <About />} />
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
          <Route path="/:username" component={Profile} />
          <Route path="*" render={PageNotFound} />
        </Switch>
      </div>
    </LogginContext.Provider>
  );
}

export default Linktree;
