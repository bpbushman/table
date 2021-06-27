import React from "react";

import LinkBar from "../link-bar/link-bar";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <h1> TABL </h1>
      <LinkBar />
    </header>
  );
};

export default Header;
