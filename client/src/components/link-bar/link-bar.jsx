import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../util/context/context";
import "./link-bar.css";

const LinkBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      {user && (
        <div className="link-bar-container">
          <Link className="links" to="/browse">Users</Link>
          <Link className="links" to="/profile">Profile</Link>
          <Link className="links" to="newsfeed">NewsFeed</Link>
          <h4 className="links" onClick={logout}>Logout</h4>
        </div>
      )}
    </div>
  );
};

export default LinkBar;
