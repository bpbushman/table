import React from "react";

import "./comment.css";

const Comment = (props) => {

  return (
    <div className="comment">
      <h5>{props.username}</h5>
      <p>{props.body}</p>
    </div>
  );
};

export default Comment;
