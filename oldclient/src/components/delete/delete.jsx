import React from "react";
import { useMutation } from "@apollo/client";

import { DELETE_POST } from "../../util/graphql/mutations";
import "./delete.css";

const Delete = (props) => {
  const [deletePost, { loading }] = useMutation(DELETE_POST, {
    variables: { postId: props.id },
  });

  const handleDelete = () => {
    deletePost();
    window.location.reload(false);
  };
  return (
    <div className="delete" onClick={handleDelete}>
      <p>{loading ? "deleting..." : "delete"}</p>
    </div>
  );
};

export default Delete;
