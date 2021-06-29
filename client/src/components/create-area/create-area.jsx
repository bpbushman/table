import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_POST } from "../../util/graphql/mutations";
import Errors from "../errors/errors";
import "./create-area.css";

const Create = () => {
  const [errors, setErrors] = useState({});
  const [body, setBody] = useState("");

  const [createPost] = useMutation(CREATE_POST, {
    update(_, result) {
      console.log(result.data.createPost);
      setBody("");
    },
    variables: { body: body },
    onError(err) {
      const newErrors = err.graphQLErrors[0].extensions.exception.errors;
      setErrors(newErrors);
    },
  });

  const handleChange = (event) => {
    const postBody = event.target.value;
    setBody(postBody);
  };

  const submit = (event) => {
    event.preventDefault();
    createPost();
    setBody("");
    setErrors({});
    if (Object.keys(errors).length === 0) {
      window.location.reload(false);
    }
  };

  const cancel = (event) => {
    event.preventDefault();
    setBody("");
  };

  return (
    <div className="create">
      <div className="create-box" title="Create a post!">
        <form onSubmit={submit}>
          <textarea onChange={handleChange} placeholder="Post" value={body} />
          <div className="buttons">
            <input type="submit" value="submit" />
            <input type="button" value="cancel" onClick={cancel} />
          </div>
        </form>
      </div>
      <Errors errors={errors} />
    </div>
  );
};

export default Create;
