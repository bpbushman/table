import React from "react";
import { useHistory } from "react-router-dom";
import { Sprite, Balloon } from "nes-react";

import './logged-out.css';

const LoggedOut = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  return (
    <div onClick={handleClick}>
      <Sprite sprite="octocat" className="cat"/>
      <Balloon fromLeft>Click me to login or make a new account</Balloon>
    </div>
  );
};

export default LoggedOut;
