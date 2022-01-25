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
        const res = await axios.post(
            "https://linktree11.herokuapp.com/account/login",
            {
                username,
                password,
            }
        );
        window.localStorage.setItem("userdata", JSON.stringify(res.data));

        const linktree = await axios.get(
            `https://linktree11.herokuapp.com/linktree/${res.data._id}`
        );
        window.localStorage.setItem("linktree", JSON.stringify(linktree.data));

        context.setLoggedIn(true);
        handleResetUsername();
        handleResetPassword();
        history.push("/home");
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Username..."
                    onChange={handleChangeUsername}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password..."
                    onChange={handleChangePassword}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default Login;
