import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_COMMENT } from "../../util/graphql/mutations";
import Errors from "../errors/errors";
import "./comment-area.css";

const CommentArea = ({ id }) => {
  const [errors, setErrors] = useState({});
  const [comment, setComment] = useState("");
  const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
    update(_, result) {
      console.log(id);
      console.log(loading);
      console.log(result.data.createPost);
    },
    variables: { postId: id, body: comment },
    onError(err) {
      const newErrors = err.graphQLErrors[0].extensions.exception.errors;
      setErrors(newErrors);
    },
  });
  const handleChange = (event) => {
    const { value } = event.target;
    setComment(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createComment();
    setComment("");
  };

  return (
    <div>
      <form className="comment-area">
        <input
          onChange={handleChange}
          className="input-text"
          type="text"
          name="comment"
          value={comment}
          placeholder="Add comment..."
        />
        <input type="submit" onClick={handleSubmit} />
      </form>
      <Errors errors={errors} />
    </div>
  );
};

export default CommentArea;
