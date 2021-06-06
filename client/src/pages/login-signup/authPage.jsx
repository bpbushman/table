import React from "react";

import Login from "../../components/login/login";
import Signup from "../../components/signup/signup";
import "./authPage.css";

const AuthPage = () => {
  return (
    <div className="auth-container">
      <Login />
      <Signup />
    </div>
  );
};

export default AuthPage;
