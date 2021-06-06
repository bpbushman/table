import React, { useContext } from "react";
import { Sprite } from "nes-react";

import { AuthContext } from "../../util/context/context";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div>
      <h1>{user.username}</h1>
      <Sprite sprite='charmander'/>
      <p>banner message</p>
      <div className='page-Spacer'/>
      <br/>
      <p>profile page banner</p>
    </div>
  );
};

export default ProfilePage;
