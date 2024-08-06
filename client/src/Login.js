import axios from "axios";
import React from "react";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { TextField } from "@mui/material";

import useHandleChange from "./hooks/useHandleChange";
import { LogginContext } from "./Linktree";

import "./css/AuthForm.css";

function Login({ toSignupForm }) {
  const context = useContext(LogginContext);
  const history = useHistory();
  const [username, handleChangeUsername, handleResetUsername] =
    useHandleChange("");
  const [password, handleChangePassword, handleResetPassword] =
    useHandleChange("");

  const [isLoading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(username, password);
    setLoading(true);
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 500)
    );
    // console.log(isLoading);
    if (!username.length || !password.length) {
      // console.log(isLoading);
      handleResetUsername();
      handleResetPassword();

      setLoading(false);
      return alert("Fill all the entries.");
    }
    console.log("sending request");
    const res = await axios.post(
      "https://linktree-ycwe.onrender.com/account/login/",
      {
        username,
        password,
      },
      {
        headers: {
          "content-type": "application/json",
          accept: "*",
        },
      }
    );
    console.log("res", res);
    if (
      res.data === "incorrect password" ||
      res.data === "user dose not exist"
    ) {
      handleResetUsername();
      handleResetPassword();
      setLoading(false);
      return alert("Incorrect Credential. Try again");
    } else {
      window.sessionStorage.setItem("userdata", JSON.stringify(res.data));

      const linktree = await axios.post(
        `https://linktree-ycwe.onrender.com/linktree/${res.data._id}`
      );
      window.sessionStorage.setItem("linktree", JSON.stringify(linktree.data));
      context.setLoggedIn(true);
      setLoading(false);
      return history.push("/home");
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
          />
          <TextField
            id="password"
            label="Password"
            variant="standard"
            fullWidth
            type="text"
            value={password}
            onChange={handleChangePassword}
            className="form-field"
            color="dark"
          />
          <button
            type="submit"
            className={
              `btn btn-large shadow-none submit-button ` +
              (isLoading && "disable")
            }
          >
            {isLoading ? (
              <div className="spinner">
                <Oval
                  height={18}
                  width={18}
                  color="#808080"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="white"
                  strokeWidth={5}
                  strokeWidthSecondary={5}
                />
              </div>
            ) : (
              <span>Login</span>
            )}
          </button>
          <div className="text-center">
            <small>
              {" "}
              <span className="text-muted">Don't have account? </span>
              <span
                className="to-toggle-form-btn"
                onClick={() => toSignupForm()}
              >
                Sign up for free
              </span>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
