import axios from "axios";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

import useHandleChange from "./hooks/useHandleChange";
import { LogginContext } from "./Linktree";

function Login() {
  const context = useContext(LogginContext);
  const history = useHistory();
  const [username, handleChangeUsername, handleResetUsername] =
    useHandleChange("");
  const [password, handleChangePassword, handleResetPassword] =
    useHandleChange("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.length || !password.length)
      return alert("Fill all the entries.");
    const res = await axios.post(
      "https://linktree11.herokuapp.com/account/login",
      {
        username,
        password,
      }
    );
    if (
      res.data === "incorrect password" ||
      res.data === "user dose not exist"
    ) {
      handleResetUsername();
      handleResetPassword();
      return alert("Incorrect Credential. Try again");
    } else {
      window.sessionStorage.setItem("userdata", JSON.stringify(res.data));

      const linktree = await axios.post(
        `https://linktree11.herokuapp.com/linktree/${res.data._id}`
      );
      window.sessionStorage.setItem("linktree", JSON.stringify(linktree.data));
      context.setLoggedIn(true);
      history.push("/home");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <span htmlFor="username">
          <i
            className="ri-account-circle-fill ml-2 mr-2"
            style={{ fontSize: "1.5rem" }}
          ></i>
        </span>
        <input
          type="text"
          id="username"
          placeholder="Username..."
          onChange={handleChangeUsername}
        />
      </div>
      <br />
      <div className="form-field">
        <span htmlFor="password">
          <i
            className="ri-key-fill ml-2 mr-2"
            style={{ fontSize: "1.5rem" }}
          ></i>
        </span>
        <input
          type="password"
          id="password"
          placeholder="Password..."
          onChange={handleChangePassword}
        />
      </div>
      <br />
      <button type="submit" className="btn btn-large shadow-none submit-button">
        Login
      </button>
    </form>
  );
}

export default Login;
