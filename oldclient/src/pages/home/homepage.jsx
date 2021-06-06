import React, { useContext } from "react";

import { AuthContext } from "../../util/context/context";
import LoggedOut from "../../components/logged-out/logged-out";
import Footer from "../../components/footer/footer";
import Create from "../../components/create-area/create-area";
import Feed from "../../components/feed/feed";
import "./homepage.css";

const HomePage = () => {
  const context = useContext(AuthContext);

  return (
    <div>
      {context.user ? (
        <div className="welcome">
          <h2>👋🏿 Welcome {context.user.username}</h2>
          <Create />
          <Feed />
          <Footer />
        </div>
      ) : (
        <div>
          <LoggedOut />
        </div>
      )}
    </div>
  );
};

export default HomePage;
