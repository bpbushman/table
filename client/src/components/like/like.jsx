import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { LIKE_POST } from "../../util/graphql/mutations";
import "./like.css";

const Like = (props) => {
  const [likeCount, setLikeCount] = useState(props.likes.length);
  const [likePost] = useMutation(LIKE_POST, {
    update(_, result) {
      setLikeCount(result.data.likePost.likes.length);
    },
    variables: { postId: props.id },
  });

  const handleLike = () => {
    likePost();
  };
  return (
    <div className="like" onClick={handleLike}>
      <p>{likeCount + " "}like</p>
    </div>
  );
};

export default Like;
