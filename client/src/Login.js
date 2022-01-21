import axios from "axios";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

import useHandleChange from "./hooks/useHandleChange";
import { LogginContext } from "./Linktree";

function Login() {
    const context = useContext(LogginContext);
    const history = useHistory();
    const [username, handleChangeUsername] = useHandleChange("");
    const [password, handleChangePassword] = useHandleChange("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:8080/account/login", {
            username,
            password,
        });
        window.localStorage.setItem("userdata", JSON.stringify(res.data));
        context.setLoggedIn(true);
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