import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Sprite, Icon } from "nes-react";

import { FOLLOW_USER } from "../../util/graphql/mutations";
import "./user-card.css";

const UserCard = (props) => {
  const [isFollowed, setIsFollowed] = useState(props.isFollowed);
  const [followUser] = useMutation(FOLLOW_USER, {
    update(_, result) {
      console.log(result);
    },
    variables: {
      username: props.username,
      userId: props.userId,
    },
  });

  const handleFollow = () => {
    followUser();
    setIsFollowed(!isFollowed);
  };

  return (
    <div className="card-container">
      <div className="title">
        <h3>{props.username}</h3>
        <Icon
          onClick={handleFollow}
          small={true}
          icon="star"
          empty={!isFollowed}
        />
      </div>
      <Sprite sprite="charmander" />
      <p>{props.banner}</p>
    </div>
  );
};

export default UserCard;
