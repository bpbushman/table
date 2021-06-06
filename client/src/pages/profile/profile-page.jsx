import React, { useContext } from "react";
import { Sprite } from "nes-react";

import { AuthContext } from "../../util/context/context";

const ProfilePage = (props) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div>
      <h1>{user.username}</h1>
      <Sprite sprite='charmander'/>
      <div>
        <h3></h3>
      </div>
    </div>
  );
};

export default ProfilePage;
