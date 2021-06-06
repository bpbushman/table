import React, { useState } from "react";
import { Container, TextArea, Button } from "nes-react";
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
    setErrors({})
    if(Object.keys(errors).length === 0) {
      window.location.reload(false);
    }
  };

  const cancel = (event) => {
    event.preventDefault();
    setBody("");
  };

  return (
    <div className="create">
      <Container className="create-box" title="Create a post!">
        <form onSubmit={submit}>
          <TextArea onChange={handleChange} placeholder="Post" value={body} />
          <div className="buttons">
            <Button success>Submit</Button>
            <Button onClick={cancel} error>
              Cancel
            </Button>
          </div>
        </form>
      </Container>
      <Errors errors={errors} />
    </div>
  );
};

export default Create;
