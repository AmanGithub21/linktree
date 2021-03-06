import axios from "axios";
import useHandleChange from "./hooks/useHandleChange";

import { useHistory } from "react-router-dom";
import { useContext } from "react";

import { LogginContext } from "./Linktree";

function Signup() {
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
            "https://linktree11.herokuapp.com/account/signup",
            {
                username,
                password,
            }
        );
        if (typeof user.data === "string") {
            return alert(user.data);
        } else {
            // I could have used jwt but didn't bothered with it because it's just a dummy project
            window.sessionStorage.setItem(
                "userdata",
                JSON.stringify(user.data)
            );

            const linktree = await axios.post(
                `https://linktree11.herokuapp.com/linktree/${user.data._id}`
            );
            console.log(linktree, "linktree from the singup.js");
            window.sessionStorage.setItem(
                "linktree",
                JSON.stringify(linktree.data)
            );
            context.setLoggedIn(true);
            handleResetUsername();
            handleResetPassword();
            handleResetRePassword();
            history.push("/home");
        }
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
                    value={repassword}
                    onChange={handleChangeRePassword}
                />
            </div>
            <button type="submit">Signup</button>
        </form>
    );
}

export default Signup;
