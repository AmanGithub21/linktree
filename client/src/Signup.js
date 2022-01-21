import axios from "axios";
import useHandleChange from "./hooks/useHandleChange";

import { useHistory } from "react-router-dom";
import { useContext } from "react";

import { LogginContext } from "./Linktree";

function Signup() {
    const context = useContext(LogginContext);
    const history = useHistory();
    const [username, handleChangeUsername] = useHandleChange("");
    const [password, handleChangePassword] = useHandleChange("");
    // const [repassword, handleChangeRePassword] = useHandleChange("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:8080/account/signup", {
            username,
            password,
        });
        // I could have used jwt but didn't bothered with it because it's just a dummy project
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
                    value={username}
                    onChange={handleChangeUsername}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password..."
                    value={password}
                    onChange={handleChangePassword}
                />
            </div>
            <div>
                <label htmlFor="password">Rewrite Password</label>
                <input
                    type="password"
                    id="repassword"
                    placeholder="Rewrite Password..."
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default Signup;