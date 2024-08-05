import axios from "axios";
import useHandleChange from "./hooks/useHandleChange";

import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { TextField } from "@mui/material";

import { LogginContext } from "./Linktree";

import "./css/AuthForm.css";

function Signup({ toLoginForm }) {
  const context = useContext(LogginContext);
  const history = useHistory();
  const [username, handleChangeUsername, handleResetUsername] =
    useHandleChange("");
  const [password, handleChangePassword, handleResetPassword] =
    useHandleChange("");
  const [repassword, handleChangeRePassword, handleResetRePassword] =
    useHandleChange("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.length || !password.length || !repassword.length)
      return alert("Fill all the entries.");
    if (repassword !== password) return alert("Rewrite the same password");
    const user = await axios.post(
      "http://linktree-ycwe.onrender.com/account/signup",
      {
        username,
        password,
      }
    );
    if (typeof user.data === "string") {
      return alert(user.data);
    } else {
      // I could have used jwt but didn't bothered with it because it's just a dummy project
      window.sessionStorage.setItem("userdata", JSON.stringify(user.data));

      const linktree = await axios.post(
        `http://linktree-ycwe.onrender.com/linktree/${user.data._id}`
      );
      console.log(linktree, "linktree from the singup.js");
      window.sessionStorage.setItem("linktree", JSON.stringify(linktree.data));
      context.setLoggedIn(true);
      handleResetUsername();
      handleResetPassword();
      handleResetRePassword();
      history.push("/home");
    }
  };
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <form
          onSubmit={handleSubmit}
          className="col-lg-3 col-md-6 col-sm-10 col-10"
        >
          <TextField
            id="username"
            label="Identity"
            variant="standard"
            fullWidth
            size="small"
            type="text"
            value={username}
            onChange={handleChangeUsername}
            className="form-field mb-3"
            color="dark"
            autoFocus
          />
          <TextField
            id="password"
            label="Password"
            variant="standard"
            fullWidth
            type="password"
            value={password}
            onChange={handleChangePassword}
            className="form-field mb-3"
            color="dark"
          />
          <TextField
            id="repassword"
            label="Retype password"
            variant="standard"
            fullWidth
            type="password"
            value={repassword}
            onChange={handleChangeRePassword}
            className="form-field"
            color="dark"
          />
          <button
            type="submit"
            className="btn btn-large shadow-none submit-button w-100"
          >
            Signup
          </button>
          <div className="text-center">
            <small>
              {" "}
              <span className="text-muted">Already have an account? </span>
              <span
                className="to-toggle-form-btn"
                onClick={() => toLoginForm()}
              >
                Login!
              </span>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
