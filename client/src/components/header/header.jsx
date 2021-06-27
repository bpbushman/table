import React from "react";

import LinkBar from "../link-bar/link-bar";
import logo from '../../assets/logo.png'
import "./header.css";

const Header = () => {
  //const path='/Users/brian/Desktop/table/table/client/src/assets/logo.png'
  return (
    <header className="header">
      <img src={logo} alt="logo"/>
      <LinkBar />
    </header>
  );
};

export default Header;
