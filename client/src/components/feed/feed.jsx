import React from "react";
import { useQuery } from "@apollo/client";

import { GET_TIMELINE_POSTS } from "../../util/graphql/queries";
import Post from "../post/post";
import "./feed.css";

const mapPostsToComponent = (data) => {
  const posts = data.map((post) => {
    return (
      <Post
        id={post.id}
        key={post.id}
        username={post.username}
        timeStamp={post.timeStamp}
        body={post.body}
        likes={post.likes}
        comments={post.comments}
      />
    );
  });
  return posts;
};

const Feed = () => {
  const { loading, data, error } = useQuery(GET_TIMELINE_POSTS);
  console.log(data.getTimelinePosts.comments)
  if (loading) return <p>loading...</p>;
  if (error) {
    console.log(error);
    return <p>there has been an error</p>;
  }

  return (
    <div className="feed">
      <h1>🔥 News feed 🔥</h1>
      {mapPostsToComponent(data.getTimelinePosts)}
    </div>
  );
};

export default Feed;
