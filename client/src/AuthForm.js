import Login from "./Login";
import Signup from "./Signup";

import { useState } from "react";

function AuthForm() {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const toSignupForm = () => {
    if (isLoggingIn) setIsLoggingIn(!isLoggingIn);
  };
  const toLoginForm = () => {
    if (!isLoggingIn) setIsLoggingIn(!isLoggingIn);
  };
  return (
    <>
      <h2 className="plain-text">Welcome!</h2>
      <div className="auth-form">
        <br />
        {isLoggingIn ? (
          <Login toSignupForm={toSignupForm} />
        ) : (
          <Signup toLoginForm={toLoginForm} />
        )}
      </div>
    </>
  );
}

export default AuthForm;
