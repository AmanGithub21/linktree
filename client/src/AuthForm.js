import "./css/AuthForm.css";
import Login from "./Login";
import Signup from "./Signup";

import { useState } from "react";

import "./css/AuthForm.css";

function AuthForm() {
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const toSignupForm = () => {
        if (isLoggingIn) setIsLoggingIn(!isLoggingIn);
    };
    const toLoginForm = () => {
        if (!isLoggingIn) setIsLoggingIn(!isLoggingIn);
    };
    return (
        <div className="auth-form">
            <div className="auth-buttons">
                <button
                    className={`auth-button ${isLoggingIn && "active"}`}
                    onClick={toLoginForm}
                >
                    Login
                </button>
                <button
                    className={`auth-button ${!isLoggingIn && "active"}`}
                    onClick={toSignupForm}
                >
                    Signup
                </button>
            </div>
            {isLoggingIn ? <Login /> : <Signup />}
        </div>
    );
}

export default AuthForm;
