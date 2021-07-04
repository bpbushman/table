import React, { useContext, useState } from "react";
import dateformat from "dateformat";

import { AuthContext } from "../../util/context/context";
import Comment from "../comment/comment";
import CommentArea from "../comment-area/comment-area";
import Delete from "../delete/delete";
import Like from "../like/like";
import "./post.css";

const mapCommentsToComponent = (data) => {
  const comments = data.map((comment) => {
    return (
      <Comment
        key={comment.id}
        id={comment.id}
        username={comment.username}
        body={comment.body}
      />
    );
  });
  return comments;
};

const formatTimeStamp = (date) => {
  return dateformat(date, "mmmm dS, yyyy");
};

const Post = (props) => {
  const currentUser = useContext(AuthContext);
  const currentUsername = currentUser.user.username;
  const [commentToggle, setCommentToggle] = useState(false);

  const commentCount = props.comments.length;

  const handleToggle = () => {
    setCommentToggle(!commentToggle);
  };

  console.log(commentToggle);
  return (
    <div className="container">
      <div className="post-tile">
        <h4>{props.username}</h4>
        <p>⏱ {formatTimeStamp(props.timeStamp)}</p>
      </div>

      <p className="post-body">{props.body}</p>
      <div className="button-area">
        <Like likes={props.likes} id={props.id} />
        <p className="comment-button" onClick={handleToggle}>
          {commentCount + " "}Comments
        </p>
        {currentUsername === props.username ? <Delete id={props.id} /> : null}
      </div>
      {commentToggle && (
        <div className="comment-styles">
          <CommentArea id={props.id} />
          <div className="comment-container">
            {mapCommentsToComponent(props.comments)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
