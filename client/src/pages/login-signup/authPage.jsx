import React, { useState } from "react";

import Login from "../../components/login/login";
import Signup from "../../components/signup/signup";
import "./authPage.css";

const AuthPage = () => {
  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="auth-container">
      {toggle ? <Login /> : <Signup />}
      <p onClick={handleToggle}>
        {toggle
          ? "Need an account? click to register"
          : "Already have an account? click to sign in!"}
      </p>
    </div>
  );
};

export default AuthPage;
