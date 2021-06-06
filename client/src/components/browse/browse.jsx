import React from "react";
import { useQuery } from "@apollo/client";

import { GET_USERS, GET_FOLLOWED_USERS } from "../../util/graphql/queries";
import UserCard from "../user-card/user-card";
import "./browse.css";

const mapUsersToCards = (data, arr) => {
  const listOfCards = data.map((user) => {
    var isFollowed = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].username === user.username) {
        isFollowed = true;
        break;
      }
    }
    return (
      <UserCard
        key={user.id}
        userId={user.id}
        isFollowed={isFollowed}
        username={user.username}
      />
    );
  });
  return listOfCards;
};

const BrowseUsers = () => {
  const {
    loading: loadFollowers,
    data: followedData,
  } = useQuery(GET_FOLLOWED_USERS, { fetchPolicy: "no-cache" });
  const { loading: userLoading, data: userData } = useQuery(GET_USERS, {
    fetchPolicy: "no-cache",
  });

  if (userLoading) return <h4>loading...</h4>;
  if (loadFollowers) return <h4>loading</h4>;
  return (
    <div>
      <h1>Users near you!</h1>
      <div className="user-card-container">
        {mapUsersToCards(userData.getUsers, followedData.getFollowedUsers)}
      </div>
    </div>
  );
};

export default BrowseUsers;
