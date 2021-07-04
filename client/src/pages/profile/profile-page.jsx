import React from "react";
import { useQuery } from "@apollo/client";
import { Sprite } from "nes-react";

import { GET_USER } from "../../util/graphql/queries";

const ProfilePage = ({ user }) => {
  const { loading, data } = useQuery(GET_USER, {
    variables: { userId: user.id },
    fetchPolicy: "no-cache",
  });

  const { banner, bio, username } = data.getUser;

  return loading ? (
    <h1>loading....</h1>
  ) : (
    <div>
      <h1>{username}</h1>
      <Sprite sprite="charmander" />
      <p>{banner}</p>
      <div className="page-Spacer" />
      <br />
      <p>{bio}</p>
    </div>
  );
};

export default ProfilePage;
