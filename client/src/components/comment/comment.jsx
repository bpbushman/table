import React from "react";

import "./comment.css";

const Comment = (props) => {
  //const [toggleComment, setToggle] = useState(false);

  return (
    <div className="comment">
      <h5>{props.username}</h5>
      <p>{props.body}</p>
    </div>
  );
};

export default Comment;
